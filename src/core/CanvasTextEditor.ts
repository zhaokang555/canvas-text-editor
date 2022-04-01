import Char from './Char';
import IRenderable from './IRenderable';
import { SizeControlPoint, SizeControlPointType } from './SizeControlPoint';
import CursorType from './CursorType';
import Border, { BorderType } from './Border';
import Victor from 'victor';
import SoftLine from './SoftLine';
import Store from './Store';
import MouseDownUpClickZone from './mouse/MouseDownUpClickZone';

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
    this.store.mouse.mousedown.topLayerCallback();
    this.store.mouse.mousedown.topLayerCallback = () => {};
    this.store.mouse.mousedown.topLayerZIndex = -Infinity;
  };

  clearCanvas = () => {
    this.store.ctx.fillStyle = this.backgroundColor;
    this.store.ctx.fillRect(0, 0, this.store.ctx.canvas.width, this.store.ctx.canvas.height);
    this.store.mouse.hover.topLayerZIndex = -Infinity;
    this.store.mouse.hover.topLayerCursorType = CursorType.defaultCursor;
  };

  move(dx: number, dy: number) {
    this.left += dx;
    this.top += dy;
    this.store.splitCharsIntoParagraphs();
    this.blankSpace.move(dx, dy);
    this.borders.forEach(border => border.move(dx, dy));
    this.sizeControlPoints.forEach(point => point.move(dx, dy));
    this.store.calcCursorPosition();
  }

  addWidthHeight(dx: number, dy: number) {
    if (this.width + dx < 0) dx = -this.width;
    if (this.height + dy < 0) dy = -this.height;

    this.width += dx;
    this.height += dy;
    this.store.splitCharsIntoParagraphs();
    this.blankSpace.addWidthHeight(dx, dy);
    this.borders.forEach(border => {
      border.addWidthHeight(dx, dy);
      if (border.type === BorderType.Right) {
        border.move(dx, 0);
      } else if (border.type === BorderType.Bottom) {
        border.move(0, dy);
      }
    });
    this.sizeControlPoints.forEach(point => {
      switch (point.type) {
        case SizeControlPointType.BottomRight:
          point.move(dx, dy);
          break;
        case SizeControlPointType.Right:
          point.move(dx, dy / 2);
          break;
        case SizeControlPointType.TopRight:
          point.move(dx, 0);
          break;
        case SizeControlPointType.Bottom:
          point.move(dx / 2, dy);
          break;
        case SizeControlPointType.Top:
          point.move(dx / 2, 0);
          break;
        case SizeControlPointType.BottomLeft:
          point.move(0, dy);
          break;
        case SizeControlPointType.Left:
          point.move(0, dy / 2);
          break;
      }
    });
    this.store.calcCursorPosition();
  }

  private initParagraphs() {
    this.store.chars = [
      new Char('/', this.store, {color: 'red', fontSize: 72}),
      new Char('t', this.store, {color: 'orange', fontSize: 72}),
      new Char('h', this.store, {color: '#dd0', fontSize: 72}),
      new Char('o', this.store, {color: 'green', fontSize: 72}),
      new Char('u', this.store, {color: 'lightblue', fontSize: 72}),
      new Char('g', this.store, {color: 'blue', fontSize: 72}),
      new Char('h', this.store, {color: 'purple', fontSize: 72}),
      new Char('t', this.store, {color: 'red', fontSize: 72}),
      new Char('w', this.store, {color: 'orange', fontSize: 72}),
      new Char('o', this.store, {color: '#dd0', fontSize: 72}),
      new Char('r', this.store, {color: 'green', fontSize: 72}),
      new Char('k', this.store, {color: 'lightblue', fontSize: 72}),
      new Char('s', this.store, {color: 'blue', fontSize: 72}),
      new Char('\n', this.store, {color: 'purple', fontSize: 72}),
      new Char('思', this.store, {color: 'purple', fontSize: 72}),
      new Char('特', this.store, {color: 'red', fontSize: 72}),
      new Char('沃', this.store, {color: 'orange', fontSize: 72}),
      new Char('克', this.store, {color: '#dd0', fontSize: 72}),
    ];
    this.store.splitCharsIntoParagraphs();
  }

  private initBorder() {
    const pointLeftTop = new Victor(this.left, this.top);
    const pointRightTop = new Victor(this.left + this.width, this.top);
    const pointLeftBottom = new Victor(this.left, this.top + this.height);
    const pointRightBottom = new Victor(this.left + this.width, this.top + this.height);

    this.borders = [
      new Border(pointLeftTop.clone(), pointRightTop.clone(), BorderType.Top, this.store),
      new Border(pointRightTop.clone(), pointRightBottom.clone(), BorderType.Right, this.store),
      new Border(pointLeftBottom.clone(), pointRightBottom.clone(), BorderType.Bottom, this.store),
      new Border(pointLeftTop.clone(), pointLeftBottom.clone(), BorderType.Left, this.store),
    ];
  }

  private initSizeControlPoints() {
    const {TopLeft, Top, TopRight, BottomLeft, Bottom, BottomRight, Left, Right} = SizeControlPointType;
    this.sizeControlPoints = [
      new SizeControlPoint(this.left, this.top, TopLeft, this.store),
      new SizeControlPoint(this.left, this.top + this.height / 2, Left, this.store),
      new SizeControlPoint(this.left, this.top + this.height, BottomLeft, this.store),
      new SizeControlPoint(this.left + this.width / 2, this.top, Top, this.store),
      new SizeControlPoint(this.left + this.width / 2, this.top + this.height, Bottom, this.store),
      new SizeControlPoint(this.left + this.width, this.top, TopRight, this.store),
      new SizeControlPoint(this.left + this.width, this.top + this.height / 2, Right, this.store),
      new SizeControlPoint(this.left + this.width, this.top + this.height, BottomRight, this.store),
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
    if (mouseX <= nearestSoftLine.left) { // handle click on paddingLeft
      const firstNonCtrlChar = nearestSoftLine.getFirstNonCtrlChar();
      if (firstNonCtrlChar) {
        returnValue.char = firstNonCtrlChar;
        return returnValue;
      }
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
