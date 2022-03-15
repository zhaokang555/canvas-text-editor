import IRenderable from './IRenderable';
import { HoverableZone } from './mouse/HoverableZone';
import CursorType from './CursorType';
import SelectableZone from './mouse/SelectableZone';
import Store from './Store';
import MouseDownUpClickZone from './mouse/MouseDownUpClickZone';

const defaultZIndex = 10;

export interface IOptions {
  color?: string;
  fontSize?: number;
}

export default class CanvasTextEditorChar implements IRenderable {
  textMetrics: TextMetrics;
  top = 0;
  color = '#000';
  fontSize = 50;
  prev: CanvasTextEditorChar | null = null;
  boundingBox: HoverableZone;
  leftHalf: MouseDownUpClickZone;
  rightHalf: MouseDownUpClickZone;
  selectableZone: SelectableZone;

  constructor(
    private char: string,
    private store: Store,
    options: IOptions = {}
  ) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value);
    this.setStyle();
    this.textMetrics = store.ctx.measureText(char);
    const width = this.textMetrics.width;
    const height = this.textMetrics.fontBoundingBoxDescent + this.textMetrics.fontBoundingBoxAscent;

    this.boundingBox = new HoverableZone(-Infinity, -Infinity, width, height, CursorType.text, store, {zIndex: defaultZIndex});
    this.leftHalf = new MouseDownUpClickZone(-Infinity, -Infinity, width / 2, height,
      this.handleClickLeft, this.handleMousedownLeft, this.handleMouseupLeft,
      store, {zIndex: defaultZIndex}
    );
    this.rightHalf = new MouseDownUpClickZone(-Infinity, -Infinity, width / 2, height,
      this.handleClickRight, this.handleMousedownRight, this.handleMouseupRight,
      store, {zIndex: defaultZIndex}
    );
    this.selectableZone = new SelectableZone(-Infinity, -Infinity, width, height, store);
  }

  get left() {
    return this.boundingBox.left;
  }

  get boundingBoxTop() {
    return this.boundingBox.top;
  }

  get width() {
    return this.boundingBox.width;
  }

  get height() {
    return this.boundingBox.height;
  }

  destructor() {
    this.boundingBox.destructor();
    this.leftHalf.destructor();
    this.rightHalf.destructor();
  }

  setPosition = (left: number, top: number) => {
    this.top = top;

    const boundingBoxTop = top - this.textMetrics.fontBoundingBoxAscent;
    this.boundingBox.left = left;
    this.boundingBox.top = boundingBoxTop;

    this.leftHalf.setPosition(left, boundingBoxTop);
    this.rightHalf.setPosition(left + this.width / 2, boundingBoxTop);

    this.selectableZone.left = left;
    this.selectableZone.top = boundingBoxTop;
  };

  render = () => {
    this.boundingBox.render();
    this.selectableZone.render();

    this.setStyle();
    this.store.ctx.fillText(this.char, this.left, this.top);
  };

  private setStyle() {
    this.store.ctx.fillStyle = this.color;
    this.store.ctx.font = `${this.fontSize}px sans-serif`;
  }

  public moveCursorToMyLeft = () => {
    if (this.prev) {
      this.store.blinkingCursor.left = this.prev.rightHalf.left + this.prev.rightHalf.width;
      this.store.blinkingCursor.top = this.prev.rightHalf.top;
      this.store.blinkingCursor.height = this.prev.fontSize;
      this.store.blinkingCursor.color = this.prev.color;
      this.store.blinkingCursor.fontSize = this.prev.fontSize;
    } else {
      this.store.blinkingCursor.left = this.leftHalf.left;
      this.store.blinkingCursor.top = this.leftHalf.top;
      this.store.blinkingCursor.height = this.fontSize;
      this.store.blinkingCursor.color = this.color;
      this.store.blinkingCursor.fontSize = this.fontSize;
    }

    this.store.paragraphs.forEach((p, i) => {
      const charIndexInP = p.chars.indexOf(this);
      if (charIndexInP > -1) {
        this.store.curParaIdx = i;

        this.store.cursorIdxInCurPara = charIndexInP;
        if (this.store.cursorIdxInCurPara < 0) this.store.cursorIdxInCurPara = 0;
      }
    });
    this.store.cursorIdxInChars = this.store.chars.indexOf(this);
  };

  public moveCursorToMyRight = () => {
    this.store.blinkingCursor.left = this.rightHalf.left + this.rightHalf.width;
    this.store.blinkingCursor.top = this.rightHalf.top;
    this.store.blinkingCursor.height = this.fontSize;
    this.store.blinkingCursor.color = this.color;
    this.store.blinkingCursor.fontSize = this.fontSize;

    this.store.paragraphs.forEach((p, i) => {
      const charIndexInP = p.chars.indexOf(this);
      if (charIndexInP > -1) {
        this.store.curParaIdx = i;

        this.store.cursorIdxInCurPara = charIndexInP + 1;
      }
    });
    const charIndex = this.store.chars.indexOf(this);
    this.store.cursorIdxInChars = charIndex + 1;
  };

  public handleClickLeft = () => {
    this.moveCursorToMyLeft();
    this.store.blinkingCursor.checkShouldShow();
  };

  public handleClickRight = () => {
    this.moveCursorToMyRight();
    this.store.blinkingCursor.checkShouldShow();
  };

  public handleMousedownLeft = () => {
    this.store.clearSelect();
    this.store.mouse.select.mousedownChar = this;
    this.store.mouse.select.isMousedownLeftHalf = true;
  };

  public handleMousedownRight = () => {
    this.store.clearSelect();
    this.store.mouse.select.mousedownChar = this;
    this.store.mouse.select.isMousedownLeftHalf = false;
  };

  public handleMouseupLeft = () => {
    this.store.mouse.select.mouseupChar = this;
    this.store.mouse.select.isMouseupLeftHalf = true;
    this.store.finishSelect();
  };

  public handleMouseupRight = () => {
    this.store.mouse.select.mouseupChar = this;
    this.store.mouse.select.isMouseupLeftHalf = false;
    this.store.finishSelect();
  };
}
