import Victor from 'victor';
import { HoverZone } from './mouse/HoverZone';
import CursorType from './CursorType';
import Store from './Store';
import DragZone from './mouse/DragZone';

const borderColor = '#999';
const borderWidth = 1;
const borderResponsiveWidth = 10;
const defaultZIndex = 100;

export enum BorderType {
  Left = 'Left',
  Right = 'Right',
  Top = 'Top',
  Bottom = 'Bottom',
}

export default class Border extends HoverZone {
  dragZone: DragZone;

  constructor(
    private from: Victor, // 'from' is to the upper left of 'to'
    private to: Victor,
    public type: BorderType,
    store: Store,
  ) {
    const normalVector = to.clone().subtract(from).rotate(Math.PI / 2).normalize();
    const points = [
      from.clone().add(normalVector.clone().multiplyScalar(borderResponsiveWidth / 2)),
      from.clone().add(normalVector.clone().multiplyScalar(-borderResponsiveWidth / 2)),
      to.clone().add(normalVector.clone().multiplyScalar(borderResponsiveWidth / 2)),
      to.clone().add(normalVector.clone().multiplyScalar(-borderResponsiveWidth / 2)),
    ];
    const left = Math.min(...points.map(p => p.x));
    const top = Math.min(...points.map(p => p.y));
    const right = Math.max(...points.map(p => p.x));
    const bottom = Math.max(...points.map(p => p.y));
    const width = right - left;
    const height = bottom - top;

    super(left, top, width, height, CursorType.move, store, {
      zIndex: defaultZIndex,
    });

    this.dragZone = new DragZone(left, top, width, height, this.handleDrag, store, {zIndex: defaultZIndex});
  }

  destructor() {
    super.destructor();
    this.dragZone.destructor();
  }

  move(dx: number, dy: number) {
    super.move(dx, dy);
    const dVector = new Victor(dx, dy);
    this.from.add(dVector);
    this.to.add(dVector);
    this.dragZone.move(dx, dy);
  }

  addWidthHeight(dx: number, dy: number) {
    if (this.type === BorderType.Top || this.type === BorderType.Bottom) {
      super.addWidthHeight(dx, 0);
      this.to.addScalarX(dx);
      this.dragZone.addWidthHeight(dx, 0);
    } else {
      super.addWidthHeight(0, dy);
      this.to.addScalarY(dy);
      this.dragZone.addWidthHeight(0, dy);
    }
  }

  render() {
    super.render();

    this.store.ctx.save();
    this.store.ctx.beginPath();
    this.store.ctx.strokeStyle = borderColor;
    this.store.ctx.lineWidth = borderWidth;
    this.store.ctx.setLineDash([3]);
    this.store.ctx.moveTo(this.from.x, this.from.y);
    this.store.ctx.lineTo(this.to.x, this.to.y);
    this.store.ctx.stroke();
    this.store.ctx.restore();
  }

  private handleDrag = (dx: number, dy: number) => {
    this.store.editor.move(dx, dy);
  };
}
