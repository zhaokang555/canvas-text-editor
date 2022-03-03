import Paragraph from './CanvasTextEditorParagraph';
import Char from './CanvasTextEditorChar';
import IRenderable from './IRenderable';
import { SizeControlPoint } from './SizeControlPoint';
import { CursorType } from './CursorType';
import { ResponsiveToMouseHover } from './ResponsiveToMouseHover';
import Border from './CanvasTextEditorBorder';
import Victor from 'victor';
import BlinkingCursor from './BlinkingCursor';

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
  private paragraphs: Paragraph[] = [];
  private sizeControlPoints: SizeControlPoint[] = [];
  private borders: Border[] = [];
  private blinkingCursor: BlinkingCursor;

  constructor(canvas: HTMLCanvasElement, options: IOptions = {}) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value);
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.blinkingCursor = new BlinkingCursor(this.ctx);
    this.initParagraphs();
    this.initBorder();
    this.initSizeControlPoints();
    this.moveBlinkingCursorToEnd();
    requestAnimationFrame(this.render);
  }

  destructor() {
    this.paragraphs.forEach(paragraph => paragraph.destructor());
    this.borders.forEach(border => border.destructor());
    this.sizeControlPoints.forEach(point => point.destructor());
  }

  render = () => {
    requestAnimationFrame(this.render);
    this.clearCanvas();
    this.paragraphs.forEach(p => p.render());
    this.borders.forEach(border => border.render());
    this.sizeControlPoints.forEach(point => point.render());
    this.blinkingCursor.render();
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
          new Char('W', this.ctx, this.blinkingCursor, {color: 'red', fontSize: 80}),
          new Char('o', this.ctx, this.blinkingCursor, {color: 'orange', fontSize: 80}),
          new Char('r', this.ctx, this.blinkingCursor, {color: 'yellow', fontSize: 80}),
          new Char('k', this.ctx, this.blinkingCursor, {color: 'green', fontSize: 80}),
          new Char('e', this.ctx, this.blinkingCursor, {color: 'lightblue', fontSize: 80}),
          new Char('r', this.ctx, this.blinkingCursor, {color: 'blue', fontSize: 80}),
          new Char('s', this.ctx, this.blinkingCursor, {color: 'purple', fontSize: 40}),
          new Char(' ', this.ctx, this.blinkingCursor),
          new Char('o', this.ctx, this.blinkingCursor, {color: 'orange', fontSize: 40}),
          new Char('f', this.ctx, this.blinkingCursor, {color: 'yellow', fontSize: 40}),
          new Char(' ', this.ctx, this.blinkingCursor),
          new Char('t', this.ctx, this.blinkingCursor, {color: 'lightblue', fontSize: 40}),
          new Char('h', this.ctx, this.blinkingCursor, {color: 'blue', fontSize: 40}),
          new Char('e', this.ctx, this.blinkingCursor, {color: 'purple', fontSize: 40}),
          new Char(' ', this.ctx, this.blinkingCursor),
          new Char('w', this.ctx, this.blinkingCursor, {color: 'orange', fontSize: 80}),
          new Char('o', this.ctx, this.blinkingCursor, {color: 'yellow', fontSize: 80}),
          new Char('r', this.ctx, this.blinkingCursor, {color: 'green', fontSize: 80}),
          new Char('l', this.ctx, this.blinkingCursor, {color: 'lightblue', fontSize: 80}),
          new Char('d', this.ctx, this.blinkingCursor, {color: 'blue', fontSize: 80}),
          new Char(',', this.ctx, this.blinkingCursor, {color: 'purple', fontSize: 80}),
          new Char(' ', this.ctx, this.blinkingCursor),
          new Char('u', this.ctx, this.blinkingCursor, {color: 'orange', fontSize: 80}),
          new Char('n', this.ctx, this.blinkingCursor, {color: 'yellow', fontSize: 80}),
          new Char('i', this.ctx, this.blinkingCursor, {color: 'green', fontSize: 80}),
          new Char('t', this.ctx, this.blinkingCursor, {color: 'lightblue', fontSize: 80}),
          new Char('e', this.ctx, this.blinkingCursor, {color: 'blue', fontSize: 80}),
          new Char('!', this.ctx, this.blinkingCursor, {color: 'purple', fontSize: 80}),
        ],
        this.ctx,
        this.left + this.paddingLeft,
        this.top,
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

  private moveBlinkingCursorToEnd() {
    const blinkingCursor = this.blinkingCursor;
    if (this.paragraphs.length > 0) {
      const lastParagraph = this.paragraphs[this.paragraphs.length - 1];
      const lastChar = lastParagraph.chars[lastParagraph.chars.length - 1];
      blinkingCursor.left = lastChar.left + lastChar.width;
      blinkingCursor.top = lastChar.boundingBoxTop;
      blinkingCursor.height = lastChar.fontSize;
    } else {
      blinkingCursor.left = this.left + this.paddingLeft;
      blinkingCursor.top = this.top;
    }
    blinkingCursor.show();
  }
}
