import CursorType from '../CursorType';
import { IBoundingBox } from '../IBoundingBox';
import IRenderable from '../IRenderable';
import Store from '../Store';

export interface IHoverableZoneOptions {
  zIndex?: number;
}

export class HoverableZone implements IBoundingBox, IRenderable {
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
    protected store: Store,
    options: IHoverableZoneOptions = {},
  ) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value);
    store.ctx.canvas.addEventListener('mousemove', this.handleMouseMove);
  }

  destructor() {
    this.store.ctx.canvas.removeEventListener('mousemove', this.handleMouseMove);
  }

  render() {
    if (this.isMouseHovering) {
      if (this.zIndex >= this.store.mouse.hover.topLayerZIndex) {
        this.store.mouse.hover.topLayerZIndex = this.zIndex;
        this.store.mouse.hover.topLayerCursorType = this.cursorType;

        // this.ctx.strokeStyle = 'red';
        // this.ctx.strokeRect(this.left, this.top, this.width, this.height);
        // this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        // this.ctx.fillRect(this.left, this.top, this.width, this.height);
      }
    }
  }

  private handleMouseMove = (evt: MouseEvent) => {
    const rect = this.store.ctx.canvas.getBoundingClientRect();
    const mouseX = evt.clientX - rect.left;
    const mouseY = evt.clientY - rect.top;

    this.isMouseHovering = (mouseX >= this.left) &&
      (mouseY >= this.top) &&
      (mouseX <= this.left + this.width) &&
      (mouseY <= this.top + this.height);
  };
}
