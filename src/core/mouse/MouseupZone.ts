import Store from '../Store';

export default class MouseupZone {
  constructor(
    public left: number,
    public top: number,
    public width: number,
    public height: number,
    public onMouseup: (mouseX: number, mouseY: number) => void,
    public store: Store,
  ) {
    this.store.ctx.canvas.addEventListener('mouseup', this.handleMouseup);
  }

  destructor() {
    this.store.ctx.canvas.removeEventListener('mouseup', this.handleMouseup);
  }

  private handleMouseup = (evt: MouseEvent) => {
    const rect = this.store.ctx.canvas.getBoundingClientRect();
    const mouseX = evt.clientX - rect.left;
    const mouseY = evt.clientY - rect.top;

    const isOnMe = (mouseX >= this.left) &&
      (mouseY >= this.top) &&
      (mouseX <= this.left + this.width) &&
      (mouseY <= this.top + this.height);

    if (isOnMe) {
      this.onMouseup(mouseX, mouseY);
    }
  };
}