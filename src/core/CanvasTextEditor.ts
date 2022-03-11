import Paragraph from './CanvasTextEditorParagraph';
import Char from './CanvasTextEditorChar';
import IRenderable from './IRenderable';
import { SizeControlPoint } from './SizeControlPoint';
import CursorType from './CursorType';
import Border from './CanvasTextEditorBorder';
import Victor from 'victor';
import BlinkingCursor from './BlinkingCursor';
import ClickableZone from './mouse/ClickableZone';
import SoftLine from './CanvasTextEditorSoftLine';
import Store from './Store';

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
  store: Store;
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
  private blankSpace: ClickableZone;

  constructor(canvas: HTMLCanvasElement, options: IOptions = {}) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value);
    this.canvas = canvas;
    const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.store = new Store(ctx);
    this.blankSpace = new ClickableZone(this.left, this.top, this.width, this.height, this.handleClickOnTheBlankSpace, this.store);
    this.blinkingCursor = new BlinkingCursor(this.store);
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
    this.canvas.style.cursor = this.store.mouse.hover.topLayerCursorType;
    this.store.mouse.click.topLayerCallbacks.forEach(cb => cb());
    this.store.mouse.click.topLayerCallbacks = [];
    this.store.mouse.click.topLayerZIndex = -Infinity;
  };

  clearCanvas = () => {
    this.store.ctx.fillStyle = this.backgroundColor;
    this.store.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.store.mouse.hover.topLayerZIndex = -Infinity;
    this.store.mouse.hover.topLayerCursorType = defaultCursor;
  };

  private initParagraphs() {
    const chars = [
      new Char('/', this.store, this.blinkingCursor, {color: 'red', fontSize: 80}),
      new Char('t', this.store, this.blinkingCursor, {color: 'orange', fontSize: 80}),
      new Char('h', this.store, this.blinkingCursor, {color: 'yellow', fontSize: 80}),
      new Char('o', this.store, this.blinkingCursor, {color: 'green', fontSize: 80}),
      new Char('u', this.store, this.blinkingCursor, {color: 'lightblue', fontSize: 80}),
      new Char('g', this.store, this.blinkingCursor, {color: 'blue', fontSize: 80}),
      new Char('h', this.store, this.blinkingCursor, {color: 'purple', fontSize: 80}),
      new Char('t', this.store, this.blinkingCursor, {color: 'red', fontSize: 80}),
      new Char('w', this.store, this.blinkingCursor, {color: 'orange', fontSize: 80}),
      new Char('o', this.store, this.blinkingCursor, {color: 'yellow', fontSize: 80}),
      new Char('r', this.store, this.blinkingCursor, {color: 'green', fontSize: 80}),
      new Char('k', this.store, this.blinkingCursor, {color: 'lightblue', fontSize: 80}),
      new Char('s', this.store, this.blinkingCursor, {color: 'blue', fontSize: 80}),
      new Char('思', this.store, this.blinkingCursor, {color: 'purple', fontSize: 80}),
      new Char('特', this.store, this.blinkingCursor, {color: 'red', fontSize: 80}),
      new Char('沃', this.store, this.blinkingCursor, {color: 'orange', fontSize: 80}),
      new Char('克', this.store, this.blinkingCursor, {color: 'yellow', fontSize: 80}),
    ];
    this.paragraphs = [
      new Paragraph(chars, this.store, this.left + this.paddingLeft, this.top, this.width - this.paddingLeft),
    ];
    this.store.chars.push(...chars);
  }

  private initBorder() {
    const pointLeftTop = new Victor(this.left, this.top);
    const pointRightTop = new Victor(this.left + this.width, this.top);
    const pointLeftBottom = new Victor(this.left, this.top + this.height);
    const pointRightBottom = new Victor(this.left + this.width, this.top + this.height);

    this.borders = [
      new Border(pointLeftTop, pointRightTop, this.store),
      new Border(pointRightTop, pointRightBottom, this.store),
      new Border(pointRightBottom, pointLeftBottom, this.store),
      new Border(pointLeftBottom, pointLeftTop, this.store),
    ];
  }

  private initSizeControlPoints() {
    this.sizeControlPoints = [
      new SizeControlPoint(this.left, this.top, nwseResize, this.store),
      new SizeControlPoint(this.left, this.top + this.height / 2, ewResize, this.store),
      new SizeControlPoint(this.left, this.top + this.height, neswResize, this.store),
      new SizeControlPoint(this.left + this.width / 2, this.top, nsResize, this.store),
      new SizeControlPoint(this.left + this.width / 2, this.top + this.height, nsResize, this.store),
      new SizeControlPoint(this.left + this.width, this.top, neswResize, this.store),
      new SizeControlPoint(this.left + this.width, this.top + this.height / 2, ewResize, this.store),
      new SizeControlPoint(this.left + this.width, this.top + this.height, nwseResize, this.store),
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
    const {char, leftSide} = this.mapPositionInBlankSpaceToChar(mouseX, mouseY);
    if (char) {
      if (leftSide) {
        char.handleClickLeft();
      } else {
        char.handleClickRight();
      }
    }
  };

  private mapPositionInBlankSpaceToChar(mouseX: number, mouseY: number) {
    const returnValue = {
      char: null as Char | null,
      leftSide: true,
    };

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

    if (nearestSoftLine == null) return returnValue;

    // 2. 在此行内找到距离点击位置最近的字符
    if (mouseX <= nearestSoftLine.chars[0].left) { // handle click on paddingLeft
      returnValue.char = nearestSoftLine.chars[0];
      return returnValue;
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

    // 3. 映射到此字符的左侧或者右侧
    returnValue.leftSide = nearestHorizontalDistance <= nearestChar.width / 2;
    returnValue.char = nearestChar;
    return returnValue;
  }
}
