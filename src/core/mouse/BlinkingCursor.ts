import IRenderable from '../IRenderable';
import Store from '../Store';

const {round} = Math;

const duration = 1000;

export default class BlinkingCursor implements IRenderable {
  height = 50;
  startBlinkingTimestamp = 0;

  get left() {
    return this._left;
  }

  set left(val) {
    this._left = round(val);
  }

  get top() {
    return this._top;
  }

  set top(val) {
    this._top = round(val);
  }

  private _left = -Infinity;
  private _top = -Infinity;
  private isShow = false;

  constructor(private store: Store) {}

  show() {
    this.isShow = true;
    this.startBlinkingTimestamp = Date.now();
  }

  hide() {
    this.isShow = false;
  }

  afterClick() {
    if (this.store.hasSelectText()) {
      this.hide();
    } else {
      this.show();
    }
  }

  render(): void {
    if (!this.isShow) {
      return;
    }

    const phase = (Date.now() - this.startBlinkingTimestamp) % duration;

    if (phase / duration < 0.5) {
      this.store.ctx.beginPath();
      this.store.ctx.moveTo(this.left, this.top);
      this.store.ctx.lineTo(this.left, this.top + this.height);
      this.store.ctx.strokeStyle = '#000';
      this.store.ctx.lineWidth = 1;
      this.store.ctx.stroke();
    }
  }
}