import Paragraph from './CanvasTextEditorParagraph';
import Char from './CanvasTextEditorChar';
import IRenderable from './IRenderable';
import { SizeControlPoint } from './SizeControlPoint';
import CursorType from './CursorType';
import Border from './CanvasTextEditorBorder';
import Victor from 'victor';
import SoftLine from './CanvasTextEditorSoftLine';
import Store from './Store';
import MouseDownUpClickZone from './mouse/MouseDownUpClickZone';

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
  store: Store;
  left = 0;
  top = 0;
  width = 400;
  height = 300;
  backgroundColor = '#fff';
  paddingLeft = 10;
  private sizeControlPoints: SizeControlPoint[] = [];
  private borders: Border[] = [];
  private blankSpace: MouseDownUpClickZone;

  constructor(container: HTMLDivElement, options: IOptions = {}) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value);
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.store = new Store(ctx, container, this);
    this.blankSpace = new MouseDownUpClickZone(
      this.left,
      this.top,
      this.width,
      this.height,
      this.handleClickOnTheBlankSpace,
      this.handleMousedownBlankSpace,
      this.handleMouseupBlankSpace,
      this.store,
    );
    this.initParagraphs();
    this.initBorder();
    this.initSizeControlPoints();
    this.moveBlinkingCursorToEnd();
    requestAnimationFrame(this.render);
  }

  destructor() {
    this.blankSpace.destructor();
    this.store.paragraphs.forEach(paragraph => paragraph.destructor());
    this.borders.forEach(border => border.destructor());
    this.sizeControlPoints.forEach(point => point.destructor());
  }

  render = () => {
    requestAnimationFrame(this.render);
    this.clearCanvas();
    this.store.paragraphs.forEach(p => p.render());
    this.borders.forEach(border => border.render());
    this.sizeControlPoints.forEach(point => point.render());
    this.store.blinkingCursor.render();
    this.store.ctx.canvas.style.cursor = this.store.mouse.hover.topLayerCursorType;
    this.store.mouse.click.topLayerCallbacks.forEach(cb => cb());
    this.store.mouse.click.topLayerCallbacks = [];
    this.store.mouse.click.topLayerZIndex = -Infinity;
  };

  clearCanvas = () => {
    this.store.ctx.fillStyle = this.backgroundColor;
    this.store.ctx.fillRect(0, 0, this.store.ctx.canvas.width, this.store.ctx.canvas.height);
    this.store.mouse.hover.topLayerZIndex = -Infinity;
    this.store.mouse.hover.topLayerCursorType = defaultCursor;
  };

  private initParagraphs() {
    this.store.chars = [
      new Char('/', this.store, {color: 'red', fontSize: 70}),
      new Char('t', this.store, {color: 'orange', fontSize: 70}),
      new Char('h', this.store, {color: '#dd0', fontSize: 70}),
      new Char('o', this.store, {color: 'green', fontSize: 70}),
      new Char('u', this.store, {color: 'lightblue', fontSize: 70}),
      new Char('g', this.store, {color: 'blue', fontSize: 70}),
      new Char('h', this.store, {color: 'purple', fontSize: 70}),
      new Char('t', this.store, {color: 'red', fontSize: 70}),
      new Char('w', this.store, {color: 'orange', fontSize: 70}),
      new Char('o', this.store, {color: '#dd0', fontSize: 70}),
      new Char('r', this.store, {color: 'green', fontSize: 70}),
      new Char('k', this.store, {color: 'lightblue', fontSize: 70}),
      new Char('s', this.store, {color: 'blue', fontSize: 70}),
      new Char('\n', this.store),
      new Char('思', this.store, {color: 'purple', fontSize: 70}),
      new Char('特', this.store, {color: 'red', fontSize: 70}),
      new Char('沃', this.store, {color: 'orange', fontSize: 70}),
      new Char('克', this.store, {color: '#dd0', fontSize: 70}),
    ];
    this.store.splitCharsIntoParagraphs();
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
    this.store.chars[this.store.chars.length - 1].handleClickRight();
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

  private handleMousedownBlankSpace = (mouseX: number, mouseY: number) => {
    const {char, leftSide} = this.mapPositionInBlankSpaceToChar(mouseX, mouseY);
    if (char) {
      if (leftSide) {
        char.handleMousedownLeft();
      } else {
        char.handleMousedownRight();
      }
    }
  };

  private handleMouseupBlankSpace = (mouseX: number, mouseY: number) => {
    const {char, leftSide} = this.mapPositionInBlankSpaceToChar(mouseX, mouseY);
    if (char) {
      if (leftSide) {
        char.handleMouseupLeft();
      } else {
        char.handleMouseupRight();
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

    for (let p of this.store.paragraphs) {
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
      if (curCharHorizontalDistance >= 0 && curCharHorizontalDistance < nearestHorizontalDistance && char.char !== '\n') {
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
