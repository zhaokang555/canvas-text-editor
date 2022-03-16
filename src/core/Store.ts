import CursorType from './CursorType';
import Char from './CanvasTextEditorChar';
import BlinkingCursor from './mouse/BlinkingCursor';
import Paragraph from './CanvasTextEditorParagraph';
import CompositionChar from './CanvasTextEditorCompositionChar';
import { CanvasTextEditor as Editor } from './CanvasTextEditor';

export default class Store {
  chars = [] as Char[];
  paragraphs: Paragraph[] = [];
  blinkingCursor: BlinkingCursor;
  cursorIdxInChars = 0;
  curParaIdx = 0;
  cursorIdxInCurPara = 0;
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
    this.chars.splice(this.cursorIdxInChars, 0, char);
    this.splitCharsIntoParagraphs();
    char.moveCursorToMyRight();
  }

  insertChars(chars: CompositionChar[]) {
    this.chars.splice(this.cursorIdxInChars, 0, ...chars);
    this.splitCharsIntoParagraphs();
    chars[chars.length - 1].moveCursorToMyRight();
  }

  clearTempCompositionChars() {
    const isTempCompositionChar = (char: Char) => char instanceof CompositionChar && char.isTemp;
    const firstTempCompositionChar = this.chars.find(isTempCompositionChar);

    if (firstTempCompositionChar) {
      firstTempCompositionChar.moveCursorToMyLeft();
      this.chars = this.chars.filter(char => !isTempCompositionChar(char));
      this.splitCharsIntoParagraphs();
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
      charsInNewPara.push(char);

      if (char.char === '\n' || i === chars.length - 1) {
        this.paragraphs.push(
          new Paragraph(charsInNewPara, this, editor.left + editor.paddingLeft, editor.top, editor.width - editor.paddingLeft)
        );
        charsInNewPara = [];
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
      if (this.cursorIdxInChars === 0) return;
      const deletingIndex = this.cursorIdxInChars - 1;
      const deletingChar = this.chars[deletingIndex];

      deletingChar.moveCursorToMyLeft();
      this.chars.splice(deletingIndex, 1);
      this.splitCharsIntoParagraphs();
    }
  }
}