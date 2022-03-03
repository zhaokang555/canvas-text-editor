import { IBoundingBox } from './IBoundingBox';

export default class ClickZone implements IBoundingBox {
  constructor(
    public left: number,
    public top: number,
    public width: number,
    public height: number,
    public onClick: () => void,
    protected ctx: CanvasRenderingContext2D,
  ) {
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
      this.onClick();
    }
  };
}