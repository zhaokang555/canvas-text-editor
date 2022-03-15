import CursorType from './CursorType';
import Char from './CanvasTextEditorChar';
import BlinkingCursor from './mouse/BlinkingCursor';
import Paragraph from './CanvasTextEditorParagraph';
import CompositionChar from './CanvasTextEditorCompositionChar';

export default class Store {
  chars = [] as Char[];
  paragraphs: Paragraph[] = [];

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

  blinkingCursor: BlinkingCursor;
  cursorIdxInChars = 0;
  curParaIdx = 0;
  cursorIdxInCurPara = 0;

  constructor(public ctx: CanvasRenderingContext2D, public container: HTMLDivElement) {
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
    this.paragraphs[this.curParaIdx].chars.splice(this.cursorIdxInCurPara, 0, char);
    this.paragraphs.forEach(p => p.calcLayout());
    char.moveCursorToMyRight();
  }

  insertChars(chars: CompositionChar[]) {
    this.chars.splice(this.cursorIdxInChars, 0, ...chars);
    this.paragraphs[this.curParaIdx].chars.splice(this.cursorIdxInCurPara, 0, ...chars);
    this.paragraphs.forEach(p => p.calcLayout());
    chars[chars.length - 1].moveCursorToMyRight();
  }

  clearTempCompositionChars() {
    const notTempCompositionChar = (char: Char) => {
      if (char instanceof CompositionChar) {
        return !char.isTemp;
      }
      return true;
    };
    this.chars = this.chars.filter(notTempCompositionChar);
    this.paragraphs.forEach(para => {
      const filteredChars = para.chars.filter(notTempCompositionChar);
      const backSteps = para.chars.length - filteredChars.length;
      this.cursorIdxInChars -= backSteps;
      this.cursorIdxInCurPara -= backSteps;
      para.chars = filteredChars;
      para.calcLayout();
    });
  }

  fixTempCompositionChar() {
    this.chars.forEach(char => {
      if (char instanceof CompositionChar) {
        char.isTemp = false;
      }
    })
  }
}