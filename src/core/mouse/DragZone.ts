import Store from '../Store';
import MousedownZone from './MousedownZone';

export default class DragZone {
  startX = 0;
  startY = 0;
  isDragging = false;
  mousedownZone: MousedownZone;

  constructor(
    public left: number,
    public top: number,
    public width: number,
    public height: number,
    public onDrag: (dx: number, dy: number) => void,
    public store: Store,
  ) {
    this.mousedownZone = new MousedownZone(left, top, width, height, (mouseX, mouseY) => {
      this.isDragging = true;
      this.startX = mouseX;
      this.startY = mouseY;
    }, store);
    this.store.ctx.canvas.addEventListener('mouseup', this.handleMouseup);
    this.store.ctx.canvas.addEventListener('mousemove', this.handleMousemove);
  }

  destructor() {
    this.store.ctx.canvas.removeEventListener('mousemove', this.handleMousemove);
    this.store.ctx.canvas.removeEventListener('mouseup', this.handleMouseup);
    this.mousedownZone.destructor();
  }

  move(dx: number, dy: number) {
    this.left += dx;
    this.top += dy;
    this.mousedownZone.move(dx, dy);
  }

  addWidthHeight(dx: number, dy: number) {
    this.width += dx;
    this.height += dy;
    this.mousedownZone.addWidthHeight(dx, dy);
  }

  private handleMouseup = (evt: MouseEvent) => {
    this.isDragging = false;
  };

  private handleMousemove = (evt: MouseEvent) => {
    const rect = this.store.ctx.canvas.getBoundingClientRect();
    const mouseX = evt.clientX - rect.left;
    const mouseY = evt.clientY - rect.top;
    const dx = mouseX - this.startX;
    const dy = mouseY - this.startY;
    this.startX = mouseX;
    this.startY = mouseY;

    if (this.isDragging) {
      this.onDrag(dx, dy);
    }
  };
}