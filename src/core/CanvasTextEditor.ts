import Paragraph from './CanvasTextEditorParagraph';
import Char from './CanvasTextEditorChar';
import { IRenderable } from './IRenderable';
import { SizeControlPoint } from './SizeControlPoint';

interface IOptions {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  borderColor?: string;
  borderWidth?: number;
}

export class CanvasTextEditor implements IRenderable {
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
          new Char('/', this.ctx, {color: 'purple', fontSize: 80}),
          new Char('t', this.ctx, {color: 'red', fontSize: 80}),
          new Char('h', this.ctx, {color: 'orange', fontSize: 80}),
          new Char('o', this.ctx, {color: 'yellow', fontSize: 80}),
          new Char('u', this.ctx, {color: 'green', fontSize: 80}),
          new Char('g', this.ctx, {color: 'lightblue', fontSize: 80}),
          new Char('h', this.ctx, {color: 'blue', fontSize: 80}),
          new Char('t', this.ctx, {color: 'purple', fontSize: 80}),
          new Char('w', this.ctx, {color: 'red', fontSize: 80}),
          new Char('o', this.ctx, {color: 'orange', fontSize: 80}),
          new Char('r', this.ctx, {color: 'yellow', fontSize: 80}),
          new Char('k', this.ctx, {color: 'green', fontSize: 80}),
          new Char('s', this.ctx, {color: 'lightblue', fontSize: 80}),
          new Char('-', this.ctx, {color: 'blue', fontSize: 80}),
          new Char('骚', this.ctx, {color: 'purple', fontSize: 80}),
          new Char('窝', this.ctx, {color: 'red', fontSize: 80}),
        ],
        this.ctx,
        this.left + this.paddingLeft,
        this.top + this.paddingTop,
        this.width - this.paddingLeft
      )
    ];

    requestAnimationFrame(this.render);
  }

  render = () => {
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

    // this.renderBorderCircle(this.left, this.top);
    // this.renderBorderCircle(this.left, this.top + this.height / 2);
    // this.renderBorderCircle(this.left, this.top + this.height);
    // this.renderBorderCircle(this.left + this.width / 2, this.top);
    // this.renderBorderCircle(this.left + this.width / 2, this.top + this.height);
    // this.renderBorderCircle(this.left + this.width, this.top);
    // this.renderBorderCircle(this.left + this.width, this.top + this.height / 2);
    // this.renderBorderCircle(this.left + this.width, this.top + this.height);

    const sizeControlPoints = [
      new SizeControlPoint(this.left, this.top, this.ctx),
      new SizeControlPoint(this.left, this.top + this.height / 2, this.ctx),
      new SizeControlPoint(this.left, this.top + this.height, this.ctx),
      new SizeControlPoint(this.left + this.width / 2, this.top, this.ctx),
      new SizeControlPoint(this.left + this.width / 2, this.top + this.height, this.ctx),
      new SizeControlPoint(this.left + this.width, this.top, this.ctx),
      new SizeControlPoint(this.left + this.width, this.top + this.height / 2, this.ctx),
      new SizeControlPoint(this.left + this.width, this.top + this.height, this.ctx),
    ];

    sizeControlPoints.forEach(p => p.render());
  };

  // renderBorderCircle = (x: number, y: number) => {
  //   this.ctx.beginPath();
  //   this.ctx.setLineDash([]);
  //   this.ctx.arc(x, y, 5, 0, Math.PI * 2);
  //   this.ctx.fillStyle = this.backgroundColor;
  //   this.ctx.fill();
  //   this.ctx.strokeStyle = this.borderColor;
  //   this.ctx.stroke();
  //   this.ctx.closePath();
  // };
}