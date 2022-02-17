import Victor from 'victor';
import { IRenderable } from './IRenderable';

const borderColor = '#999';
const borderWidth = 1;

export default class CanvasTextEditorBorder implements IRenderable {
  constructor(
    public from: Victor,
    public to: Victor,
    protected ctx: CanvasRenderingContext2D,
  ) {
  }

  render() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = borderColor;
    this.ctx.lineWidth = borderWidth;
    this.ctx.setLineDash([3]);
    this.ctx.moveTo(this.from.x, this.from.y);
    this.ctx.lineTo(this.to.x, this.to.y);
    this.ctx.stroke();
  }
}
