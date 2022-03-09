import Victor from 'victor';
import { HoverableZone } from './mouse/HoverableZone';
import CursorType from './CursorType';
import Store from './Store';

const borderColor = '#999';
const borderWidth = 1;
const borderResponsiveWidth = 10;
const defaultZIndex = 100;

export default class CanvasTextEditorBorder extends HoverableZone {
  constructor(
    public from: Victor,
    public to: Victor,
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
  }

  render() {
    super.render();

    this.store.ctx.beginPath();
    this.store.ctx.strokeStyle = borderColor;
    this.store.ctx.lineWidth = borderWidth;
    this.store.ctx.setLineDash([3]);
    this.store.ctx.moveTo(this.from.x, this.from.y);
    this.store.ctx.lineTo(this.to.x, this.to.y);
    this.store.ctx.stroke();
  }
}
