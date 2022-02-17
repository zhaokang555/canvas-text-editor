import Paragraph from './CanvasTextEditorParagraph';
import Char from './CanvasTextEditorChar';
import { IRenderable } from './IRenderable';
import { SizeControlPoint } from './SizeControlPoint';
import { CursorType } from './CursorType';
import { ResponsiveToMouseHover } from './ResponsiveToMouseHover';
import Border from './CanvasTextEditorBorder';
import Victor from 'victor';

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
  backgroundColor = '#fff';
  paddingLeft = 10;
  paddingTop = 10;
  private paragraphs: Paragraph[] = [];
  private sizeControlPoints: SizeControlPoint[] = [];
  private borders: Border[] = [];

  constructor(canvas: HTMLCanvasElement, options: IOptions = {}) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value);
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.initParagraphs();
    this.initBorder();
    this.initSizeControlPoints();
    requestAnimationFrame(this.render);
  }

  destructor() {
    this.sizeControlPoints.forEach(point => point.destructor());
  }

  render = () => {
    requestAnimationFrame(this.render);
    this.clearCanvas();
    this.paragraphs.forEach(p => p.render());
    this.borders.forEach(border => border.render());
    this.sizeControlPoints.forEach(point => point.render());
    this.canvas.style.cursor = ResponsiveToMouseHover.topLayerCursorType;
  };

  clearCanvas = () => {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ResponsiveToMouseHover.topLayerZIndex = -Infinity;
    ResponsiveToMouseHover.topLayerCursorType = defaultCursor;
  };

  private initParagraphs() {
    this.paragraphs = [
      new Paragraph(
        [
          new Char('W', this.ctx, {color: 'red', fontSize: 80}),
          new Char('o', this.ctx, {color: 'orange', fontSize: 80}),
          new Char('r', this.ctx, {color: 'yellow', fontSize: 80}),
          new Char('k', this.ctx, {color: 'green', fontSize: 80}),
          new Char('e', this.ctx, {color: 'lightblue', fontSize: 80}),
          new Char('r', this.ctx, {color: 'blue', fontSize: 80}),
          new Char('s', this.ctx, {color: 'purple', fontSize: 80}),
          new Char(' ', this.ctx, {color: 'red', fontSize: 80}),
          new Char('o', this.ctx, {color: 'orange', fontSize: 80}),
          new Char('f', this.ctx, {color: 'yellow', fontSize: 80}),
          new Char(' ', this.ctx, {color: 'green', fontSize: 80}),
          new Char('t', this.ctx, {color: 'lightblue', fontSize: 80}),
          new Char('h', this.ctx, {color: 'blue', fontSize: 80}),
          new Char('e', this.ctx, {color: 'purple', fontSize: 80}),
          new Char(' ', this.ctx, {color: 'red', fontSize: 80}),
          new Char('w', this.ctx, {color: 'orange', fontSize: 80}),
          new Char('o', this.ctx, {color: 'yellow', fontSize: 80}),
          new Char('r', this.ctx, {color: 'green', fontSize: 80}),
          new Char('l', this.ctx, {color: 'lightblue', fontSize: 80}),
          new Char('d', this.ctx, {color: 'blue', fontSize: 80}),
          new Char(',', this.ctx, {color: 'purple', fontSize: 80}),
          new Char(' ', this.ctx, {color: 'red', fontSize: 80}),
          new Char('u', this.ctx, {color: 'orange', fontSize: 80}),
          new Char('n', this.ctx, {color: 'yellow', fontSize: 80}),
          new Char('i', this.ctx, {color: 'green', fontSize: 80}),
          new Char('t', this.ctx, {color: 'lightblue', fontSize: 80}),
          new Char('e', this.ctx, {color: 'blue', fontSize: 80}),
          new Char('!', this.ctx, {color: 'purple', fontSize: 80}),
        ],
        this.ctx,
        this.left + this.paddingLeft,
        this.top + this.paddingTop,
        this.width - this.paddingLeft
      )
    ];
  }

  private initBorder() {
    const pointLeftTop = new Victor(this.left, this.top);
    const pointRightTop = new Victor(this.left + this.width, this.top);
    const pointLeftBottom = new Victor(this.left, this.top + this.height);
    const pointRightBottom = new Victor(this.left + this.width, this.top + this.height);

    this.borders = [
      new Border(pointLeftTop, pointRightTop, this.ctx),
      new Border(pointRightTop, pointRightBottom, this.ctx),
      new Border(pointRightBottom, pointLeftBottom, this.ctx),
      new Border(pointLeftBottom, pointLeftTop, this.ctx),
    ];
  }

  private initSizeControlPoints() {
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
  }
}
