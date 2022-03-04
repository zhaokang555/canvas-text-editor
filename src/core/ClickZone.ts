import { IBoundingBox } from './IBoundingBox';

interface IOptions {
  zIndex?: number;
}

export default class ClickZone implements IBoundingBox {
  public static topLayerZIndex = -Infinity;
  public static topLayerCallbacks: Array<() => void> = [];
  public zIndex = 0;

  constructor(
    public left: number,
    public top: number,
    public width: number,
    public height: number,
    public onClick: (mouseX: number, mouseY: number) => void,
    protected ctx: CanvasRenderingContext2D,
    options: IOptions = {},
  ) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value);
    ctx.canvas.addEventListener('click', this.handleClick);
  }

  destructor() {
    this.ctx.canvas.removeEventListener('click', this.handleClick);
  }

  private handleClick = (evt: MouseEvent) => {

    const rect = this.ctx.canvas.getBoundingClientRect();
    const mouseX = evt.clientX - rect.left;
    const mouseY = evt.clientY - rect.top;

    const isClickOnMe = (mouseX >= this.left) &&
      (mouseY >= this.top) &&
      (mouseX <= this.left + this.width) &&
      (mouseY <= this.top + this.height);

    if (isClickOnMe) {
      if (this.zIndex > ClickZone.topLayerZIndex) {
        ClickZone.topLayerCallbacks = [() => this.onClick(mouseX, mouseY)];
      } else if (this.zIndex === ClickZone.topLayerZIndex) {
        ClickZone.topLayerCallbacks.push(() => this.onClick(mouseX, mouseY));
      }
    }
  };
}