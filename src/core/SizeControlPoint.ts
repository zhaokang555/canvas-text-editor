import { IRenderable } from './IRenderable';
import { IBoundingBox } from './IBoundingBox';

export class SizeControlPoint implements IBoundingBox, IRenderable {
  radius = 5;
  left: number;
  top: number;
  width = this.radius * 2;
  height = this.radius * 2;
  borderColor = '#999';
  backgroundColor = '#fff';

  constructor(private centerX: number, private centerY: number, private ctx: CanvasRenderingContext2D) {
    this.left = centerX - this.radius;
    this.top = centerY - this.radius;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.setLineDash([]);
    this.ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fill();
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.stroke();
    this.ctx.closePath();
  }
}