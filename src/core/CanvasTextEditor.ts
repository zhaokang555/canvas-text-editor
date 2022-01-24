import Paragraph from './CanvasTextEditorParagraph';
import Char from './CanvasTextEditorChar';

interface IOptions {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  borderColor?: string;
  borderWidth?: number;
}

export class CanvasTextEditor {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  left = 0;
  top = 0;
  width = 400;
  height = 300;
  borderColor = '#999';
  borderWidth = 1;
  backgroundColor = '#fff';
  paddingLeft = 10;
  paddingTop = 10;
  paragraphs: Paragraph[] = [];

  constructor(canvas: HTMLCanvasElement, options: IOptions = {}) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value);
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.paragraphs = [
      new Paragraph(
        [
          new Char('a', this.ctx, {color: 'red', fontSize: 120}),
          new Char('b', this.ctx, {color: 'orange', fontSize: 120}),
          new Char('c', this.ctx, {color: 'yellow', fontSize: 120}),
          new Char('d', this.ctx, {color: 'green', fontSize: 120}),
          new Char('e', this.ctx, {color: 'lightblue', fontSize: 80}),
          new Char('f', this.ctx, {color: 'blue', fontSize: 80}),
          new Char('g', this.ctx, {color: 'purple', fontSize: 80}),
          new Char('h', this.ctx, {color: 'red', fontSize: 80}),
          new Char('i', this.ctx, {color: 'orange', fontSize: 80}),
          new Char('j', this.ctx, {color: 'yellow', fontSize: 120}),
          new Char('k', this.ctx, {color: 'green', fontSize: 120}),
        ],
        this.ctx,
        this.left + this.paddingLeft,
        this.top + this.paddingTop,
        this.width - this.paddingLeft
      )
    ];

    requestAnimationFrame(this.render);
  }

  render = (time: number) => {
    requestAnimationFrame(this.render);
    this.clearCanvas();
    this.renderBorder();
    this.paragraphs.forEach(p => p.render());
  };

  clearCanvas = () => {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  renderBorder = () => {
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.lineWidth = this.borderWidth;
    this.ctx.setLineDash([3]);
    this.ctx.strokeRect(this.left, this.top, this.width, this.height);

    this.renderBorderCircle(this.left, this.top);
    this.renderBorderCircle(this.left, this.top + this.height / 2);
    this.renderBorderCircle(this.left, this.top + this.height);
    this.renderBorderCircle(this.left + this.width / 2, this.top);
    this.renderBorderCircle(this.left + this.width / 2, this.top + this.height);
    this.renderBorderCircle(this.left + this.width, this.top);
    this.renderBorderCircle(this.left + this.width, this.top + this.height / 2);
    this.renderBorderCircle(this.left + this.width, this.top + this.height);
  };

  renderBorderCircle = (x: number, y: number) => {
    this.ctx.beginPath();
    this.ctx.setLineDash([]);
    this.ctx.arc(x, y, 5, 0, Math.PI * 2);
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fill();
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.stroke();
    this.ctx.closePath();
  };
}