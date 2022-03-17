import CursorType from './CursorType';
import Char from './CanvasTextEditorChar';
import BlinkingCursor from './mouse/BlinkingCursor';
import Paragraph from './CanvasTextEditorParagraph';
import CompositionChar from './CanvasTextEditorCompositionChar';
import { CanvasTextEditor as Editor } from './CanvasTextEditor';
import SoftLine from './CanvasTextEditorSoftLine';
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
  };

  constructor(public ctx: CanvasRenderingContext2D, public container: HTMLDivElement, public editor: Editor) {
    this.blinkingCursor = new BlinkingCursor(this);
  }

  clearSelect() {
    this.mouse.select.mousedownChar = null;
    this.mouse.select.mouseupChar = null;
    this.mouse.select.isMousedownLeftHalf = true;
    this.mouse.select.isMouseupLeftHalf = true;
    this.chars.forEach(char => char.selectableZone.isSelected = false);
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
      char.selectableZone.isSelected = (i >= beginIndex && i <= endIndex);
    });
  }

  hasSelectText() {
    return this.chars.some(char => char.selectableZone.isSelected);
  }

  insertChar(char: Char) {
    this.chars.splice(this.getCursorIdx(), 0, char);
    this.splitCharsIntoParagraphs();
    char.moveCursorToMyRight();
  }

  insertChars(chars: CompositionChar[]) {
    this.chars.splice(this.getCursorIdx(), 0, ...chars);
    this.splitCharsIntoParagraphs();
    chars[chars.length - 1].moveCursorToMyRight();
  }

  clearTempCompositionChars() {
    const isTempCompositionChar = (char: Char) => char instanceof CompositionChar && char.isTemp;
    const lastTempCompositionChar: Char | undefined = _.findLast(this.chars, isTempCompositionChar);

    if (lastTempCompositionChar) {
      const firstCharAfterTempCompositionChars = this.getNextChar(lastTempCompositionChar);
      this.chars = this.chars.filter(char => !isTempCompositionChar(char));
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
    if (this.blinkingCursor.isShow) {
      const deletingChar = this.getPrevChar(this.charUnderCursor);
      if (!deletingChar) return;

      this.chars = this.chars.filter(c => c !== deletingChar);
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

  getPrevChar(char: Char | null) {
    if (!char) return this.chars[this.chars.length - 1];
    const i = this.chars.indexOf(char);
    const prevChar = this.chars[i - 1];
    if (prevChar) return prevChar;
    return null;
  }

  getNextChar(char: Char | null) {
    if (!char) return null;
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
    }
  }
}