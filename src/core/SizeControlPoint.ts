import { CursorType } from './CursorType';
import { IHoverableZoneOptions, HoverableZone } from './mouse/HoverableZone';

const radius = 5;
const defaultZIndex = 1000;

export class SizeControlPoint extends HoverableZone {
  borderColor = '#999';
  backgroundColor = '#fff';

  constructor(
    private centerX: number,
    private centerY: number,
    public cursorType: CursorType,
    ctx: CanvasRenderingContext2D,
    options: IHoverableZoneOptions = {},
  ) {
    const left = centerX - radius;
    const top = centerY - radius;
    const width = 2 * radius;
    const height = 2 * radius;
    super(left, top, width, height, cursorType, ctx, {
      zIndex: defaultZIndex,
      ...options,
    });
  }

  render = () => {
    super.render();

    this.ctx.beginPath();
    this.ctx.setLineDash([]);
    this.ctx.arc(this.centerX, this.centerY, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fill();
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.stroke();
    this.ctx.closePath();
  };

}
