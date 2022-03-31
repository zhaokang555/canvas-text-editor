import { IBoundingBox } from '../IBoundingBox';
import Store from '../Store';

export interface IOptions {
  zIndex?: number;
}

export default class ClickZone implements IBoundingBox {
  zIndex = 0;

  constructor(
    public left: number,
    public top: number,
    public width: number,
    public height: number,
    public onClick: (mouseX: number, mouseY: number) => void,
    public store: Store,
    options: IOptions = {},
  ) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value);
    this.store.ctx.canvas.addEventListener('click', this.handleClick);
  }

  destructor() {
    this.store.ctx.canvas.removeEventListener('click', this.handleClick);
  }

  private handleClick = (evt: MouseEvent) => {
    const rect = this.store.ctx.canvas.getBoundingClientRect();
    const mouseX = evt.clientX - rect.left;
    const mouseY = evt.clientY - rect.top;

    const isOnMe = (mouseX >= this.left) &&
      (mouseY >= this.top) &&
      (mouseX <= this.left + this.width) &&
      (mouseY <= this.top + this.height);

    if (isOnMe) {
      if (this.zIndex > this.store.mouse.click.topLayerZIndex) {
        this.store.mouse.click.topLayerCallbacks = [() => this.onClick(mouseX, mouseY)];
        this.store.mouse.click.topLayerZIndex = this.zIndex;
      } else if (this.zIndex === this.store.mouse.click.topLayerZIndex) {
        this.store.mouse.click.topLayerCallbacks.push(() => this.onClick(mouseX, mouseY));
      }
    }
  };
}