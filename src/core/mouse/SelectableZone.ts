import { IBoundingBox } from '../IBoundingBox';
import IRenderable from '../IRenderable';

const backgroundColor = 'rgba(0, 0, 0, 0.15)';

export default class SelectableZone implements IBoundingBox, IRenderable {
  isSelected = false;

  constructor(
    public left: number,
    public top: number,
    public width: number,
    public height: number,
    private ctx: CanvasRenderingContext2D,
  ) {}

  render() {
    if (this.isSelected) {
      this.ctx.fillStyle = backgroundColor;
      this.ctx.fillRect(this.left, this.top, this.width, this.height);
    }
  }
}