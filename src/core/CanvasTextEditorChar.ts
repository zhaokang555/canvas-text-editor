import IRenderable from './IRenderable';
import { HoverableZone } from './mouse/HoverableZone';
import CursorType from './CursorType';
import BlinkingCursor from './BlinkingCursor';
import SelectableZone from './mouse/SelectableZone';
import Store from './Store';
import MouseDownUpClickZone from './mouse/MouseDownUpClickZone';

const defaultZIndex = 10;

interface IOptions {
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
    private blinkingCursor: BlinkingCursor,
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

  public handleClickLeft = () => {
    if (this.prev) {
      this.blinkingCursor.left = this.prev.rightHalf.left + this.prev.rightHalf.width;
      this.blinkingCursor.top = this.prev.rightHalf.top;
      this.blinkingCursor.height = this.prev.fontSize;
    } else {
      this.blinkingCursor.left = this.leftHalf.left;
      this.blinkingCursor.top = this.leftHalf.top;
      this.blinkingCursor.height = this.fontSize;
    }
    this.blinkingCursor.afterClick();
  };

  public handleClickRight = () => {
    this.blinkingCursor.left = this.rightHalf.left + this.rightHalf.width;
    this.blinkingCursor.top = this.rightHalf.top;
    this.blinkingCursor.height = this.fontSize;
    this.blinkingCursor.afterClick();
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
