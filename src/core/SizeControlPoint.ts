import CursorType from './CursorType';
import { IHoverableZoneOptions, HoverableZone } from './mouse/HoverableZone';
import Store from './Store';

const radius = 5;
const defaultZIndex = 1000;

export class SizeControlPoint extends HoverableZone {
  borderColor = '#999';
  backgroundColor = '#fff';

  constructor(
    private centerX: number,
    private centerY: number,
    public cursorType: CursorType,
    store: Store,
    options: IHoverableZoneOptions = {},
  ) {
    const left = centerX - radius;
    const top = centerY - radius;
    const width = 2 * radius;
    const height = 2 * radius;
    super(left, top, width, height, cursorType, store, {
      zIndex: defaultZIndex,
      ...options,
    });
  }

  render = () => {
    super.render();

    this.store.ctx.beginPath();
    this.store.ctx.setLineDash([]);
    this.store.ctx.arc(this.centerX, this.centerY, radius, 0, Math.PI * 2);
    this.store.ctx.fillStyle = this.backgroundColor;
    this.store.ctx.fill();
    this.store.ctx.strokeStyle = this.borderColor;
    this.store.ctx.stroke();
    this.store.ctx.closePath();
  };

}
