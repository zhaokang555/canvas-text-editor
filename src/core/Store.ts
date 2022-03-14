import CursorType from './CursorType';
import Char from './CanvasTextEditorChar';
import BlinkingCursor from './mouse/BlinkingCursor';
import Paragraph from './CanvasTextEditorParagraph';

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
}