import { IBoundingBox } from '../IBoundingBox';
import IRenderable from '../IRenderable';
import Store from '../Store';

const backgroundColor = 'rgba(0, 0, 0, 0.15)';

export default class SelectZone implements IBoundingBox, IRenderable {
  isSelected = false;

  constructor(
    public left: number,
    public top: number,
    public width: number,
    public height: number,
    private store: Store,
  ) {}

  render() {
    if (this.isSelected) {
      this.store.ctx.fillStyle = backgroundColor;
      this.store.ctx.fillRect(this.left, this.top, this.width, this.height);
    }
  }
}