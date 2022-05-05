import CursorType from './CursorType';
import Char from './Char';
import BlinkingCursor from './mouse/BlinkingCursor';
import Paragraph from './Paragraph';
import CompositionChar from './CompositionChar';
import { CanvasTextEditor as Editor } from './CanvasTextEditor';
import SoftLine from './SoftLine';
import _ from 'lodash';

export default class Store {
  chars = [] as Char[];
  paragraphs: Paragraph[] = [];
  blinkingCursor: BlinkingCursor;
  charUnderCursor: Char | null = null; // null means cursor at end
  isComposition = false;

  mouse = {
    click: {
      topLayerZIndex: -Infinity,
      topLayerCallbacks: [] as Array<() => void>,
    },
    hover: {
      topLayerZIndex: -Infinity,
      topLayerCursorType: CursorType.defaultCursor,
    },
    select: {
      mousedownChar: null as Char | null,
      mouseupChar: null as Char | null,
      isMousedownLeftHalf: true,
      isMouseupLeftHalf: true,
    },
    mousedown: {
      topLayerZIndex: -Infinity,
      topLayerCallback: (() => {}) as () => void
    },
  };

  constructor(public ctx: CanvasRenderingContext2D, public container: HTMLDivElement, public editor: Editor) {
    this.blinkingCursor = new BlinkingCursor(this);
  }

  clearSelect() {
    this.mouse.select.mousedownChar = null;
    this.mouse.select.mouseupChar = null;
    this.mouse.select.isMousedownLeftHalf = true;
    this.mouse.select.isMouseupLeftHalf = true;
    this.chars.forEach(char => char.selectZone.isSelected = false);
  }

  selectAllChars() {
    if (this.chars.length > 0) {
      this.clearSelect();
      this.mouse.select.mousedownChar = this.chars[0];
      this.mouse.select.isMousedownLeftHalf = true;
      this.mouse.select.mouseupChar = this.chars[this.chars.length - 1];
      this.mouse.select.isMouseupLeftHalf = false;
      this.finishSelect();
      this.blinkingCursor.checkShouldShow();
    }
  }

  finishSelect() {
    const {mousedownChar, mouseupChar, isMousedownLeftHalf, isMouseupLeftHalf} = this.mouse.select;

    if (!mousedownChar || !mouseupChar) {
      return;
    }

    const mousedownIndex = this.chars.findIndex(char => char === mousedownChar);
    const mouseupIndex = this.chars.findIndex(char => char === mouseupChar);

    let beginIndex: number, endIndex: number;
    if (
      mousedownIndex < mouseupIndex ||
      (mousedownIndex === mouseupIndex && isMousedownLeftHalf && !isMouseupLeftHalf)
    ) {
      // select text from front to back
      beginIndex = isMousedownLeftHalf ? mousedownIndex : mousedownIndex + 1;
      endIndex = isMouseupLeftHalf ? mouseupIndex - 1 : mouseupIndex;
    } else {
      // select text from back to front
      beginIndex = isMouseupLeftHalf ? mouseupIndex : mouseupIndex + 1;
      endIndex = isMousedownLeftHalf ? mousedownIndex - 1 : mousedownIndex;
    }

    this.chars.forEach((char, i) => {
      char.selectZone.isSelected = (i >= beginIndex && i <= endIndex);
    });
  }

  hasSelectedText() {
    return this.chars.some(char => char.selectZone.isSelected);
  }

  deleteSelectedChars() {
    const selectedChars = this.chars.filter(char => char.selectZone.isSelected);
    if (selectedChars.length > 0) {
      const firstCharAfterSelectedChars = this.getNextChar(_.last(selectedChars));
      const lastCharBeforeSelectedChars = this.getPrevChar(_.first(selectedChars));
      this.chars = this.chars.filter(char => !char.selectZone.isSelected);
      selectedChars.forEach(char => char.destructor());
      this.splitCharsIntoParagraphs();
      this.blinkingCursor.isShow = true;
      if (firstCharAfterSelectedChars) {
        if (firstCharAfterSelectedChars.char !== '\n') {
          firstCharAfterSelectedChars.moveCursorToMyLeft();
        } else {
          if (lastCharBeforeSelectedChars) {
            lastCharBeforeSelectedChars.moveCursorToMyRight();
          } else {
            this.moveCursorToStart();
          }
        }
      } else {
        this.moveCursorToEnd();
      }
    }
  }

  insertChar(char: Char) {
    this.chars.splice(this.getCursorIdx(), 0, char);
    this.splitCharsIntoParagraphs();
    char.moveCursorToMyRight();
  }

  insertChars(chars: Char[]) {
    this.chars.splice(this.getCursorIdx(), 0, ...chars);
    this.splitCharsIntoParagraphs();
    chars[chars.length - 1].moveCursorToMyRight();
  }

  clearTempCompositionChars() {
    const isTempCompositionChar = (char: Char) => char instanceof CompositionChar && char.isTemp;
    const charsToBeDeleted: Char[] = this.chars.filter(isTempCompositionChar);

    if (charsToBeDeleted.length > 0) {
      const firstCharAfterTempCompositionChars = this.getNextChar(_.last(charsToBeDeleted));
      this.chars = this.chars.filter(char => !isTempCompositionChar(char));
      charsToBeDeleted.forEach(c => c.destructor());
      this.splitCharsIntoParagraphs();

      if (firstCharAfterTempCompositionChars) {
        firstCharAfterTempCompositionChars.moveCursorToMyLeft();
      } else {
        this.moveCursorToEnd();
      }
    }
  }

  fixTempCompositionChar() {
    this.chars.forEach(char => {
      if (char instanceof CompositionChar) {
        char.isTemp = false;
      }
    });
  }

  splitCharsIntoParagraphs() {
    const {chars, editor} = this;
    this.paragraphs = [];

    let charsInNewPara: Char[] = [];
    chars.forEach((char, i) => {
      if (char.char === '\n') {
        this.paragraphs.push(new Paragraph(charsInNewPara, this, editor.left + editor.paddingLeft, editor.top, editor.width - editor.paddingLeft));
        charsInNewPara = [];
      }

      charsInNewPara.push(char);

      if (i === chars.length - 1) {
        this.paragraphs.push(new Paragraph(charsInNewPara, this, editor.left + editor.paddingLeft, editor.top, editor.width - editor.paddingLeft));
      }
    });

    this.paragraphs.forEach((para, i) => {
      const prevPara = this.paragraphs[i - 1] || null;
      if (prevPara != null) {
        para.top = prevPara.top + prevPara.height;
      }
      para.calcLayout();
    });
  }

  deleteCharBeforeCursor() {
    const deletingChar = this.getPrevChar(this.charUnderCursor);
    if (!deletingChar) return;

    this.chars = this.chars.filter(c => c !== deletingChar);
    deletingChar.destructor();
    this.splitCharsIntoParagraphs();
    if (this.charUnderCursor) {
      const prevChar = this.getPrevChar(this.charUnderCursor);
      if (prevChar) {
        prevChar.moveCursorToMyRight();
      } else { // cursor at the beginning
        this.charUnderCursor.moveCursorToMyLeft();
      }
    } else {
      this.moveCursorToEnd();
    }
  }

  getPrevCharInSoftLine(char: Char) {
    let curSoftLine: SoftLine | null = null;
    for (const para of this.paragraphs) {
      for (const softLine of para.softLines) {
        if (softLine.chars.includes(char)) {
          curSoftLine = softLine;
        }
      }
    }

    if (curSoftLine != null) {
      const i = curSoftLine.chars.indexOf(char);
      const prevChar = curSoftLine.chars[i - 1];
      if (prevChar != null) {
        return prevChar;
      }
    }
    return null;
  }

  getCursorIdx() {
    if (this.charUnderCursor != null) {
      return this.chars.indexOf(this.charUnderCursor);
    }
    return this.chars.length; // cursor at end
  }

  getPrevChar(char: Char | null = null) {
    if (char == null) return this.chars[this.chars.length - 1];
    const i = this.chars.indexOf(char);
    const prevChar = this.chars[i - 1];
    if (prevChar) return prevChar;
    return null;
  }

  getNextChar(char: Char | null = null) {
    if (char == null) return null;
    const i = this.chars.indexOf(char);
    const nextChar = this.chars[i + 1];
    if (nextChar) return nextChar;
    return null;
  }

  moveCursorToEnd() {
    if (this.chars.length > 0) {
      this.chars[this.chars.length - 1].moveCursorToMyRight();
    } else {
      this.blinkingCursor.left = this.editor.left + this.editor.paddingLeft;
      this.blinkingCursor.top = this.editor.top;
    }
  }

  moveCursorToStart() {
    if (this.chars.length > 0) {
      this.chars[0].moveCursorToMyLeft();
    } else {
      this.blinkingCursor.left = this.editor.left + this.editor.paddingLeft;
      this.blinkingCursor.top = this.editor.top;
    }
  }

  copySelectedChars() {
    return window.navigator.clipboard.writeText(
      this.chars.filter(char => char.selectZone.isSelected).map(char => char.char).join('')
    ).catch((err) => {
      console.log('copy failed:', err);
    });
  }

  paste() {
    return window.navigator.clipboard.readText().then(text => {
      if (text.length > 0) {
        const {color, fontSize} = this.blinkingCursor;
        const chars = text.split('').map(char => new Char(char, this, {color, fontSize}));
        this.insertChars(chars);
      }
    }).catch((err) => {
      console.log('paste failed:', err);
    });
  }

  calcCursorPosition() {
    if (this.charUnderCursor) {
      this.charUnderCursor.moveCursorToMyRight();
    } else {
      this.moveCursorToEnd();
    }
  }

  setColor(color: string) {
    if (this.hasSelectedText()) {
      const selectedChars = this.chars.filter(char => char.selectZone.isSelected);
      selectedChars.forEach(char => char.color = color);
    } else {
      this.blinkingCursor.color = color;
    }
    this.blinkingCursor.getFocus();
  }
}