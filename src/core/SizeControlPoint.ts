import { CursorType } from './CursorType';
import { IResponsiveToMouseHoverOptions, ResponsiveToMouseHover } from './ResponsiveToMouseHover';

const radius = 5;

export class SizeControlPoint extends ResponsiveToMouseHover {
  borderColor = '#999';
  backgroundColor = '#fff';

  constructor(
    private centerX: number,
    private centerY: number,
    public cursorType: CursorType,
    ctx: CanvasRenderingContext2D,
    options: IResponsiveToMouseHoverOptions = {},
  ) {
    const left = centerX - radius;
    const top = centerY - radius;
    const width = 2 * radius;
    const height = 2 * radius;
    super(left, top, width, height, cursorType, ctx, options);
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
