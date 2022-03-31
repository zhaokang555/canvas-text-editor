import Store from '../Store';

export interface IOptions {
  zIndex?: number;
}

export default class MousedownZone {
  zIndex = 0;

  constructor(
    public left: number,
    public top: number,
    public width: number,
    public height: number,
    public onMousedown: (mouseX: number, mouseY: number) => void,
    public store: Store,
    options: IOptions = {},
  ) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value);
    this.store.ctx.canvas.addEventListener('mousedown', this.handleMousedown);
  }

  destructor() {
    this.store.ctx.canvas.removeEventListener('mousedown', this.handleMousedown);
  }

  move(dx: number, dy: number) {
    this.left += dx;
    this.top += dy;
  }

  addWidthHeight(dx: number, dy: number) {
    this.width += dx;
    this.height += dy;
  }

  private handleMousedown = (evt: MouseEvent) => {
    const rect = this.store.ctx.canvas.getBoundingClientRect();
    const mouseX = evt.clientX - rect.left;
    const mouseY = evt.clientY - rect.top;

    const isOnMe = (mouseX >= this.left) &&
      (mouseY >= this.top) &&
      (mouseX <= this.left + this.width) &&
      (mouseY <= this.top + this.height);

    if (isOnMe && this.zIndex > this.store.mouse.mousedown.topLayerZIndex) {
      this.store.mouse.mousedown.topLayerCallback = () => this.onMousedown(mouseX, mouseY);
      this.store.mouse.mousedown.topLayerZIndex = this.zIndex;
    }
  };
}