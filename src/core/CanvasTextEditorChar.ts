import { IRenderable } from './IRenderable';
import { ResponsiveToMouseHover } from './ResponsiveToMouseHover';
import { CursorType } from './CursorType';

const defaultZIndex = 10;

interface IOptions {
  color?: string;
  fontSize?: number;
}

export default class CanvasTextEditorChar implements IRenderable {
  width: number;
  height: number;
  textMetrics: TextMetrics;
  left = 0;
  top = 0;
  color = '#000';
  fontSize = 50;
  boundingBox: ResponsiveToMouseHover;

  constructor(private char: string, private ctx: CanvasRenderingContext2D, options: IOptions = {}) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value);
    this.setStyle();
    this.textMetrics = ctx.measureText(char);
    this.width = this.textMetrics.width;
    this.height = this.textMetrics.fontBoundingBoxDescent + this.textMetrics.fontBoundingBoxAscent;

    this.boundingBox = new ResponsiveToMouseHover(-Infinity, -Infinity, this.width, this.height, CursorType.text, this.ctx, {zIndex: defaultZIndex});
  }

  destructor() {
    this.boundingBox.destructor();
  }

  setPosition = (left: number, top: number) => {
    this.left = left;
    this.top = top;

    const boundingBoxTop = top - this.textMetrics.fontBoundingBoxAscent;
    this.boundingBox.left = left;
    this.boundingBox.top = boundingBoxTop;
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
}
