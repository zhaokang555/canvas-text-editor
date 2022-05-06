import IRenderable from './IRenderable';
import { HoverZone } from './mouse/HoverZone';
import CursorType from './CursorType';
import SelectZone from './mouse/SelectZone';
import Store from './Store';
import MouseDownUpClickZone from './mouse/MouseDownUpClickZone';

const defaultZIndex = 10;

export interface IOptions {
  color?: string;
  fontSize?: number;
}

export default class Char implements IRenderable {
  textMetrics: TextMetrics;
  top = 0;
  color = '#000';
  fontSize = 50;
  boundingBox: HoverZone;
  leftHalf: MouseDownUpClickZone;
  rightHalf: MouseDownUpClickZone;
  selectZone: SelectZone;

  constructor(
    public char: string,
    private store: Store,
    options: IOptions = {}
  ) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value);
    this.setStyle();
    this.textMetrics = store.ctx.measureText(char === '\n' ? '' : char);
    const width = this.textMetrics.width;
    const height = this.textMetrics.fontBoundingBoxDescent + this.textMetrics.fontBoundingBoxAscent;

    this.boundingBox = new HoverZone(-Infinity, -Infinity, width, height, CursorType.text, store, {zIndex: defaultZIndex});
    this.leftHalf = new MouseDownUpClickZone(-Infinity, -Infinity, width / 2, height,
      this.handleClickLeft, this.handleMousedownLeft, this.handleMouseupLeft,
      store, {zIndex: defaultZIndex}
    );
    this.rightHalf = new MouseDownUpClickZone(-Infinity, -Infinity, width / 2, height,
      this.handleClickRight, this.handleMousedownRight, this.handleMouseupRight,
      store, {zIndex: defaultZIndex}
    );
    this.selectZone = new SelectZone(-Infinity, -Infinity, width, height, store);
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

    this.selectZone.left = left;
    this.selectZone.top = boundingBoxTop;
  };

  render = () => {
    this.boundingBox.render();
    this.selectZone.render();

    this.setStyle();
    this.store.ctx.fillText(this.char, this.left, this.top);
  };

  private setStyle() {
    this.store.ctx.fillStyle = this.color;
    this.store.ctx.font = `${this.fontSize}px sans-serif`;
  }

  public moveCursorToMyLeft = (autoMathStyle = true) => {
    const {blinkingCursor} = this.store;
    const prevCharInSoftLine = this.store.getPrevCharInSoftLine(this);

    if (prevCharInSoftLine) {
      blinkingCursor.left = prevCharInSoftLine.rightHalf.left + prevCharInSoftLine.rightHalf.width;
      blinkingCursor.top = prevCharInSoftLine.rightHalf.top;
      autoMathStyle && blinkingCursor.matchCharStyle(prevCharInSoftLine);
    } else {
      blinkingCursor.left = this.leftHalf.left;
      blinkingCursor.top = this.leftHalf.top;
      autoMathStyle && blinkingCursor.matchCharStyle(this);
    }
    this.store.charUnderCursor = this;
  };

  public moveCursorToMyRight = (autoMathStyle = true) => {
    this.store.blinkingCursor.left = this.rightHalf.left + this.rightHalf.width;
    this.store.blinkingCursor.top = this.rightHalf.top;
    autoMathStyle && this.store.blinkingCursor.matchCharStyle(this);
    this.store.charUnderCursor = this.store.getNextChar(this);
  };

  public handleClickLeft = () => {
    this.store.blinkingCursor.getFocus();
    if (this.store.hasSelectedText()) {
      this.store.blinkingCursor.hide();
    } else {
      this.store.blinkingCursor.show();
      this.moveCursorToMyLeft();
    }
  };

  public handleClickRight = () => {
    this.store.blinkingCursor.getFocus();
    if (this.store.hasSelectedText()) {
      this.store.blinkingCursor.hide();
    } else {
      this.store.blinkingCursor.show();
      this.moveCursorToMyRight();
    }
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
