import CursorType from './CursorType';
import Char from './CanvasTextEditorChar';

export default class Store {
  chars = [] as Char[];

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
      beginChar: null as Char | null,
      endChar: null as Char | null,
    }
  };

  constructor(public ctx: CanvasRenderingContext2D) {

  }

  getGlobalNextChar(char: Char): Char | null {
    const i = this.chars.indexOf(char);
    return this.chars[i + 1] || null;
  }

  getGlobalPrevChar(char: Char): Char | null {
    const i = this.chars.indexOf(char);
    return this.chars[i - 1] || null;
  }

  clearSelect() {
    this.mouse.select.beginChar = null;
    this.mouse.select.endChar = null;
  }

  finishSelect() {
    const {beginChar, endChar} = this.mouse.select;
    const beginIndex = this.chars.findIndex(char => char === beginChar);
    const endIndex = this.chars.findIndex(char => char === endChar);

    if (beginIndex > -1 && endIndex > -1) {
      this.chars.forEach((char, i) => {
        char.selectableZone.isSelected = (i >= beginIndex && i <= endIndex);
      })
    } else {
      this.chars.forEach(char => char.selectableZone.isSelected = false);
    }
  }

  hasSelectText() {
    return this.chars.some(char => char.selectableZone.isSelected);
  }
}