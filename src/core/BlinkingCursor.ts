import IRenderable from './IRenderable';

export default class BlinkingCursor implements IRenderable {
  left = -Infinity;
  top = -Infinity;
  height = 50;

  constructor(private ctx: CanvasRenderingContext2D) {}

  render(): void {
    this.ctx.beginPath();
    this.ctx.moveTo(this.left, this.top);
    this.ctx.lineTo(this.left, this.top + this.height);
    this.ctx.strokeStyle = '#000';
    this.ctx.stroke();
  }
}