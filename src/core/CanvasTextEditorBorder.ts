import Victor from 'victor';
import { HoverableZone } from './mouse/HoverableZone';
import { CursorType } from './CursorType';

const borderColor = '#999';
const borderWidth = 1;
const borderResponsiveWidth = 10;
const defaultZIndex = 100;

export default class CanvasTextEditorBorder extends HoverableZone {
  constructor(
    public from: Victor,
    public to: Victor,
    ctx: CanvasRenderingContext2D,
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

    super(left, top, width, height, CursorType.move, ctx, {
      zIndex: defaultZIndex,
    });
  }

  render() {
    super.render();

    this.ctx.beginPath();
    this.ctx.strokeStyle = borderColor;
    this.ctx.lineWidth = borderWidth;
    this.ctx.setLineDash([3]);
    this.ctx.moveTo(this.from.x, this.from.y);
    this.ctx.lineTo(this.to.x, this.to.y);
    this.ctx.stroke();
  }
}
