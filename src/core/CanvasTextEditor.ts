import Paragraph from './CanvasTextEditorParagraph';
import Char from './CanvasTextEditorChar';
import { IRenderable } from './IRenderable';
import { SizeControlPoint } from './SizeControlPoint';
import { CursorType } from './CursorType';

const {defaultCursor, ewResize, nsResize, neswResize, nwseResize} = CursorType;

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
  private sizeControlPoints: SizeControlPoint[] = [];

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
          new Char('思', this.ctx, {color: 'purple', fontSize: 80}),
          new Char('沃', this.ctx, {color: 'red', fontSize: 80}),
        ],
        this.ctx,
        this.left + this.paddingLeft,
        this.top + this.paddingTop,
        this.width - this.paddingLeft
      )
    ];

    this.sizeControlPoints = [
      new SizeControlPoint(this.left, this.top, nwseResize, this.ctx),
      new SizeControlPoint(this.left, this.top + this.height / 2, ewResize, this.ctx),
      new SizeControlPoint(this.left, this.top + this.height, neswResize, this.ctx),
      new SizeControlPoint(this.left + this.width / 2, this.top, nsResize, this.ctx),
      new SizeControlPoint(this.left + this.width / 2, this.top + this.height, nsResize, this.ctx),
      new SizeControlPoint(this.left + this.width, this.top, neswResize, this.ctx),
      new SizeControlPoint(this.left + this.width, this.top + this.height / 2, ewResize, this.ctx),
      new SizeControlPoint(this.left + this.width, this.top + this.height, nwseResize, this.ctx),
    ];

    requestAnimationFrame(this.render);
  }

  destructor() {
    this.sizeControlPoints.forEach(point => point.destructor());
  }

  render = () => {
    requestAnimationFrame(this.render);
    this.clearCanvas();
    this.paragraphs.forEach(p => p.render());
    this.renderBorder();
    this.sizeControlPoints.forEach(point => point.render());
  };

  clearCanvas = () => {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.style.cursor = defaultCursor;
  };

  renderBorder = () => {
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.lineWidth = this.borderWidth;
    this.ctx.setLineDash([3]);
    this.ctx.strokeRect(this.left, this.top, this.width, this.height);
  };
}