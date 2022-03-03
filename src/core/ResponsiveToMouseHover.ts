import { CursorType } from './CursorType';
import { IBoundingBox } from './IBoundingBox';
import IRenderable from './IRenderable';

export interface IResponsiveToMouseHoverOptions {
  zIndex?: number;
}

export class ResponsiveToMouseHover implements IBoundingBox, IRenderable {
  public static topLayerZIndex = -Infinity;
  public static topLayerCursorType = CursorType.defaultCursor;
  public zIndex = 0;
  private isMouseHovering = false;

  constructor(
    public left: number,
    public top: number,
    public width: number,
    public height: number,
    public cursorType: CursorType,
    protected ctx: CanvasRenderingContext2D,
    options: IResponsiveToMouseHoverOptions = {},
  ) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value);
    ctx.canvas.addEventListener('mousemove', this.handleMouseMove);
  }

  destructor() {
    this.ctx.canvas.removeEventListener('mousemove', this.handleMouseMove);
  }

  render() {
    if (this.isMouseHovering) {
      if (this.zIndex >= ResponsiveToMouseHover.topLayerZIndex) {
        ResponsiveToMouseHover.topLayerZIndex = this.zIndex;
        ResponsiveToMouseHover.topLayerCursorType = this.cursorType;

        // this.ctx.strokeStyle = 'red';
        // this.ctx.strokeRect(this.left, this.top, this.width, this.height);
        // this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        // this.ctx.fillRect(this.left, this.top, this.width, this.height);
      }
    }
  }

  private handleMouseMove = (evt: MouseEvent) => {
    const rect = this.ctx.canvas.getBoundingClientRect();
    const mouseX = evt.clientX - rect.left;
    const mouseY = evt.clientY - rect.top;

    this.isMouseHovering = (mouseX >= this.left) &&
      (mouseY >= this.top) &&
      (mouseX <= this.left + this.width) &&
      (mouseY <= this.top + this.height);
  };
}
