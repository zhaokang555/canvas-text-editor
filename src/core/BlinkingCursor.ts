import IRenderable from './IRenderable';

const duration = 1000;

export default class BlinkingCursor implements IRenderable {
  left = -Infinity;
  top = -Infinity;
  height = 50;
  startBlinkingTimestamp = 0;

  constructor(private ctx: CanvasRenderingContext2D) {}

  show() {
    this.startBlinkingTimestamp = Date.now();
  }

  render(): void {
    const phase = (Date.now() - this.startBlinkingTimestamp) % duration;

    if (phase / duration < 0.5) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.left, this.top);
      this.ctx.lineTo(this.left, this.top + this.height);
      this.ctx.strokeStyle = '#000';
      this.ctx.stroke();
    }
  }
}