import { CursorType } from './CursorType';
import { IBoundingBox } from './IBoundingBox';
import { IRenderable } from './IRenderable';

export class ResponsiveToMouseHover implements IBoundingBox, IRenderable {
  private mouseX = -1;
  private mouseY = -1;
  private isMouseHovering = false;

  constructor(public left: number, public top: number, public width: number, public height: number, public cursorType: CursorType, protected ctx: CanvasRenderingContext2D) {
    ctx.canvas.addEventListener('mousemove', this.handleMouseMove);
  }

  destructor() {
    this.ctx.canvas.removeEventListener('mousemove', this.handleMouseMove);
  }

  render() {
    if (this.isMouseHovering) {
      this.ctx.canvas.style.cursor = this.cursorType;
    }
  }

  private handleMouseMove = (evt: MouseEvent) => {
    const rect = this.ctx.canvas.getBoundingClientRect();
    this.mouseX = evt.clientX - rect.left;
    this.mouseY = evt.clientY - rect.top;

    this.isMouseHovering = (this.mouseX >= this.left) &&
      (this.mouseY >= this.top) &&
      (this.mouseX <= this.left + this.width) &&
      (this.mouseY <= this.top + this.height);
  };
}
