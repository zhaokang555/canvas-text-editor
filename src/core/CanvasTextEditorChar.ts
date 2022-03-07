import IRenderable from './IRenderable';
import { HoverableZone } from './mouse/HoverableZone';
import CursorType from './CursorType';
import ClickableZone from './mouse/ClickableZone';
import BlinkingCursor from './BlinkingCursor';
import SelectableZone from './mouse/SelectableZone';
import HalfChar from './CanvasTextEditorHalfChar';

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
  leftHalf: HalfChar;
  rightHalf: HalfChar;
  selectableZone: SelectableZone;

  constructor(
    private char: string,
    private ctx: CanvasRenderingContext2D,
    private blinkingCursor: BlinkingCursor,
    options: IOptions = {}
  ) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value);
    this.setStyle();
    this.textMetrics = ctx.measureText(char);
    const width = this.textMetrics.width;
    const height = this.textMetrics.fontBoundingBoxDescent + this.textMetrics.fontBoundingBoxAscent;

    this.boundingBox = new HoverableZone(-Infinity, -Infinity, width, height, CursorType.text, ctx, {zIndex: defaultZIndex});
    this.leftHalf = new HalfChar(new ClickableZone(-Infinity, -Infinity, width / 2, height, this.handleClickLeft, ctx, {zIndex: defaultZIndex}));
    this.rightHalf = new HalfChar(new ClickableZone(-Infinity, -Infinity, width / 2, height, this.handleClickRight, ctx, {zIndex: defaultZIndex}));
    this.selectableZone = new SelectableZone(-Infinity, -Infinity, width, height, ctx);
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
    this.leftHalf.clickableZone.destructor();
    this.rightHalf.clickableZone.destructor();
  }

  setPosition = (left: number, top: number) => {
    this.top = top;

    const boundingBoxTop = top - this.textMetrics.fontBoundingBoxAscent;
    this.boundingBox.left = left;
    this.boundingBox.top = boundingBoxTop;

    this.leftHalf.clickableZone.left = left;
    this.leftHalf.clickableZone.top = boundingBoxTop;

    this.rightHalf.clickableZone.left = left + this.width / 2;
    this.rightHalf.clickableZone.top = boundingBoxTop;

    this.selectableZone.left = left;
    this.selectableZone.top = boundingBoxTop;
  };

  render = () => {
    this.boundingBox.render();
    this.selectableZone.render();

    this.setStyle();
    this.ctx.fillText(this.char, this.left, this.top);
  };

  private setStyle() {
    this.ctx.fillStyle = this.color;
    this.ctx.font = `${this.fontSize}px sans-serif`;
  }

  public handleClickLeft = () => {
    if (this.prev) {
      this.blinkingCursor.left = this.prev.rightHalf.clickableZone.left + this.prev.rightHalf.clickableZone.width;
      this.blinkingCursor.top = this.prev.rightHalf.clickableZone.top;
      this.blinkingCursor.height = this.prev.fontSize;
    } else {
      this.blinkingCursor.left = this.leftHalf.clickableZone.left;
      this.blinkingCursor.top = this.leftHalf.clickableZone.top;
      this.blinkingCursor.height = this.fontSize;
    }
    this.blinkingCursor.show();
  };

  public handleClickRight = () => {
    this.blinkingCursor.left = this.rightHalf.clickableZone.left + this.rightHalf.clickableZone.width;
    this.blinkingCursor.top = this.rightHalf.clickableZone.top;
    this.blinkingCursor.height = this.fontSize;
    this.blinkingCursor.show();
  };
}
