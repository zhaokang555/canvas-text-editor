import CursorType from './CursorType';
import { IHoverZoneOptions, HoverZone } from './mouse/HoverZone';
import DragZone from './mouse/DragZone';
import Store from './Store';

const radius = 5;
const defaultZIndex = 1000;

export enum SizeControlPointType {
  TopLeft = 'TopLeft',
  Top = 'Top',
  TopRight = 'TopRight',
  BottomLeft = 'BottomLeft',
  Bottom = 'Bottom',
  BottomRight = 'BottomRight',
  Left = 'Left',
  Right = 'Right',
}

function mapSizeControlPointTypeToCursorType(type: SizeControlPointType): CursorType {
  const {ewResize, nsResize, neswResize, nwseResize} = CursorType;
  switch (type) {
    case SizeControlPointType.TopLeft:
    case SizeControlPointType.BottomRight:
      return nwseResize;
    case SizeControlPointType.TopRight:
    case SizeControlPointType.BottomLeft:
      return neswResize;
    case SizeControlPointType.Top:
    case SizeControlPointType.Bottom:
      return nsResize;
    case SizeControlPointType.Left:
    case SizeControlPointType.Right:
      return ewResize;
  }
}

export class SizeControlPoint extends HoverZone {
  borderColor = '#999';
  backgroundColor = '#fff';
  dragZone: DragZone;

  constructor(
    private centerX: number,
    private centerY: number,
    public type: SizeControlPointType,
    store: Store,
    options: IHoverZoneOptions = {},
  ) {
    const left = centerX - radius;
    const top = centerY - radius;
    const width = 2 * radius;
    const height = 2 * radius;
    const cursorType = mapSizeControlPointTypeToCursorType(type);
    super(left, top, width, height, cursorType, store, {
      zIndex: defaultZIndex,
      ...options,
    });
    this.dragZone = new DragZone(left, top, width, height, this.handleDrag, store, {zIndex: defaultZIndex});
  }

  destructor() {
    super.destructor();
    this.dragZone.destructor();
  }

  render = () => {
    super.render();

    this.store.ctx.beginPath();
    this.store.ctx.arc(this.centerX, this.centerY, radius, 0, Math.PI * 2);
    this.store.ctx.fillStyle = this.backgroundColor;
    this.store.ctx.fill();
    this.store.ctx.strokeStyle = this.borderColor;
    this.store.ctx.stroke();
    this.store.ctx.closePath();
  };

  move(dx: number, dy: number) {
    super.move(dx, dy);
    this.centerX += dx;
    this.centerY += dy;
    this.dragZone.move(dx, dy);
  }

  private handleDrag = (dx: number, dy: number) => {
    const {editor} = this.store;
    const {TopLeft, Top, TopRight, BottomLeft, Bottom, BottomRight, Left, Right} = SizeControlPointType;

    switch (this.type) {
      case TopLeft:
        editor.move(dx, dy);
        editor.addWidthHeight(-dx, -dy);
        break;
      case Top:
        editor.move(0, dy);
        editor.addWidthHeight(0, -dy);
        break;
      case TopRight:
        editor.move(0, dy);
        editor.addWidthHeight(dx, -dy);
        break;
      case Right:
        editor.addWidthHeight(dx, 0);
        break;
      case BottomRight:
        editor.addWidthHeight(dx, dy);
        break;
      case Bottom:
        editor.addWidthHeight(0, dy);
        break;
      case BottomLeft:
        editor.move(dx, 0);
        editor.addWidthHeight(-dx, dy);
        break;
      case Left:
        editor.move(dx, 0);
        editor.addWidthHeight(-dx, 0);
        break;
    }
  };
}
