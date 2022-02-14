import { IBoundingBox } from './IBoundingBox';
import { IRenderable } from './IRenderable';

interface IOptions {
  color?: string;
  fontSize?: number;
}

export default class CanvasTextEditorChar implements IBoundingBox, IRenderable {
  width: number;
  height: number;
  textMetrics: TextMetrics;
  left = 0;
  top = 0;
  color = '#000';
  fontSize = 50;
  boundingBoxTop = 0;

  constructor(private char: string, private ctx: CanvasRenderingContext2D, options: IOptions = {}) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value);
    this.setStyle();
    this.textMetrics = ctx.measureText(char);
    this.width = this.textMetrics.width;
    this.height = this.textMetrics.fontBoundingBoxDescent + this.textMetrics.fontBoundingBoxAscent;
  }

  setPosition = (left: number, top: number) => {
    this.left = left;
    this.top = top;
    this.boundingBoxTop = top - this.textMetrics.fontBoundingBoxAscent;
  };

  render = () => {
    // this.ctx.strokeStyle = 'red';
    // this.ctx.strokeRect(this.left, this.boundingBoxTop, this.width, this.height);
    // this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    // this.ctx.fillRect(this.left, this.boundingBoxTop, this.width, this.height);
    this.setStyle();
    this.ctx.fillText(this.char, this.left, this.top);
  };

  private setStyle() {
    this.ctx.fillStyle = this.color;
    this.ctx.font = `${this.fontSize}px sans-serif`;
  }
}