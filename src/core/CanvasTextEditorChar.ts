import IRenderable from './IRenderable';
import { ResponsiveToMouseHover } from './ResponsiveToMouseHover';
import { CursorType } from './CursorType';
import ClickZone from './ClickZone';
import BlinkingCursor from './BlinkingCursor';

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
  boundingBox: ResponsiveToMouseHover;
  leftClickZone: ClickZone;
  rightClickZone: ClickZone;
  prev: CanvasTextEditorChar | null = null;

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

    this.boundingBox = new ResponsiveToMouseHover(-Infinity, -Infinity, width, height, CursorType.text, ctx, {zIndex: defaultZIndex});
    this.leftClickZone = new ClickZone(-Infinity, -Infinity, width / 2, height, this.handleClickLeft, ctx, {zIndex: defaultZIndex});
    this.rightClickZone = new ClickZone(-Infinity, -Infinity, width / 2, height, this.handleClickRight, ctx, {zIndex: defaultZIndex});
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
    this.leftClickZone.destructor();
    this.rightClickZone.destructor();
  }

  setPosition = (left: number, top: number) => {
    this.top = top;

    const boundingBoxTop = top - this.textMetrics.fontBoundingBoxAscent;
    this.boundingBox.left = left;
    this.boundingBox.top = boundingBoxTop;

    this.leftClickZone.left = left;
    this.leftClickZone.top = boundingBoxTop;

    this.rightClickZone.left = left + this.width / 2;
    this.rightClickZone.top = boundingBoxTop;
  };

  render = () => {
    this.boundingBox.render();

    this.setStyle();
    this.ctx.fillText(this.char, this.left, this.top);
  };

  private setStyle() {
    this.ctx.fillStyle = this.color;
    this.ctx.font = `${this.fontSize}px sans-serif`;
  }

  public handleClickLeft = () => {
    if (this.prev) {
      this.blinkingCursor.left = this.prev.rightClickZone.left + this.prev.rightClickZone.width;
      this.blinkingCursor.top = this.prev.rightClickZone.top;
      this.blinkingCursor.height = this.prev.fontSize;
    } else {
      this.blinkingCursor.left = this.leftClickZone.left;
      this.blinkingCursor.top = this.leftClickZone.top;
      this.blinkingCursor.height = this.fontSize;
    }
    this.blinkingCursor.show();
  };

  public handleClickRight = () => {
    this.blinkingCursor.left = this.rightClickZone.left + this.rightClickZone.width;
    this.blinkingCursor.top = this.rightClickZone.top;
    this.blinkingCursor.height = this.fontSize;
    this.blinkingCursor.show();
  };
}
