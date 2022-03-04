import Paragraph from './CanvasTextEditorParagraph';
import Char from './CanvasTextEditorChar';
import IRenderable from './IRenderable';
import { SizeControlPoint } from './SizeControlPoint';
import { CursorType } from './CursorType';
import { ResponsiveToMouseHover } from './ResponsiveToMouseHover';
import Border from './CanvasTextEditorBorder';
import Victor from 'victor';
import BlinkingCursor from './BlinkingCursor';
import ClickZone from './ClickZone';
import SoftLine from './CanvasTextEditorSoftLine';

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
  private blankSpace: ClickZone;

  constructor(canvas: HTMLCanvasElement, options: IOptions = {}) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value);
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.blankSpace = new ClickZone(this.left, this.top, this.width, this.height, this.handleClickOnTheBlankSpace, this.ctx);
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
    ClickZone.topLayerCallbacks.forEach(cb => cb());
    ClickZone.topLayerCallbacks = [];
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
          new Char('W', this.ctx, this.blinkingCursor, {color: 'red', fontSize: 60}),
          new Char('o', this.ctx, this.blinkingCursor, {color: 'orange', fontSize: 60}),
          new Char('r', this.ctx, this.blinkingCursor, {color: 'yellow', fontSize: 60}),
          new Char('k', this.ctx, this.blinkingCursor, {color: 'green', fontSize: 60}),
          new Char('e', this.ctx, this.blinkingCursor, {color: 'lightblue', fontSize: 60}),
          new Char('r', this.ctx, this.blinkingCursor, {color: 'blue', fontSize: 60}),
          new Char('s', this.ctx, this.blinkingCursor, {color: 'purple', fontSize: 40}),
          new Char(' ', this.ctx, this.blinkingCursor),
          new Char('o', this.ctx, this.blinkingCursor, {color: 'orange', fontSize: 40}),
          new Char('f', this.ctx, this.blinkingCursor, {color: 'yellow', fontSize: 40}),
          new Char(' ', this.ctx, this.blinkingCursor),
          new Char('t', this.ctx, this.blinkingCursor, {color: 'lightblue', fontSize: 40}),
          new Char('h', this.ctx, this.blinkingCursor, {color: 'blue', fontSize: 40}),
          new Char('e', this.ctx, this.blinkingCursor, {color: 'purple', fontSize: 40}),
          new Char(' ', this.ctx, this.blinkingCursor),
          new Char('w', this.ctx, this.blinkingCursor, {color: 'orange', fontSize: 60}),
          new Char('o', this.ctx, this.blinkingCursor, {color: 'yellow', fontSize: 60}),
          new Char('r', this.ctx, this.blinkingCursor, {color: 'green', fontSize: 60}),
          new Char('l', this.ctx, this.blinkingCursor, {color: 'lightblue', fontSize: 60}),
          new Char('d', this.ctx, this.blinkingCursor, {color: 'blue', fontSize: 60}),
          new Char(',', this.ctx, this.blinkingCursor, {color: 'purple', fontSize: 60}),
          new Char(' ', this.ctx, this.blinkingCursor),
          new Char('u', this.ctx, this.blinkingCursor, {color: 'orange', fontSize: 60}),
          new Char('n', this.ctx, this.blinkingCursor, {color: 'yellow', fontSize: 60}),
          new Char('i', this.ctx, this.blinkingCursor, {color: 'green', fontSize: 60}),
          new Char('t', this.ctx, this.blinkingCursor, {color: 'lightblue', fontSize: 60}),
          new Char('e', this.ctx, this.blinkingCursor, {color: 'blue', fontSize: 60}),
          new Char('!', this.ctx, this.blinkingCursor, {color: 'purple', fontSize: 60}),
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

  private handleClickOnTheBlankSpace = (mouseX: number, mouseY: number) => {
    // 1. 找到距离点击位置最近的行
    let nearestSoftLine: SoftLine | null = null;
    let nearestVerticalDistance = Infinity;

    for (let p of this.paragraphs) {
      for (let softLine of p.softLines) {
        const curLineVerticalDistance = mouseY - softLine.top;
        if (nearestSoftLine == null) {
          nearestSoftLine = softLine;
          nearestVerticalDistance = curLineVerticalDistance;
        } else if (curLineVerticalDistance >= 0 && curLineVerticalDistance < nearestVerticalDistance) {
          nearestSoftLine = softLine;
          nearestVerticalDistance = curLineVerticalDistance;
        }
      }
    }

    if (nearestSoftLine == null) return;

    // 2. 在此行内找到距离点击位置最近的字符
    if (mouseX <= nearestSoftLine.chars[0].left) {
      nearestSoftLine.chars[0].handleClickLeft();
      return;
    }
    let nearestChar: Char = nearestSoftLine.chars[0];
    let nearestHorizontalDistance = mouseX - nearestChar.left;
    for (let char of nearestSoftLine.chars) {
      const curCharHorizontalDistance = mouseX - char.left;
      if (curCharHorizontalDistance >= 0 && curCharHorizontalDistance < nearestHorizontalDistance) {
        nearestChar = char;
        nearestHorizontalDistance = curCharHorizontalDistance;
      }
    }

    // 3. 在此字符的左侧或者右侧插入光标
    if (nearestHorizontalDistance <= nearestChar.width / 2) {
      nearestChar.handleClickLeft();
    } else {
      nearestChar.handleClickRight();
    }
  };
}
