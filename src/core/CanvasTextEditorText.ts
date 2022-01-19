export class CanvasTextEditorText {
  content: string;
  left = 0;
  top = 0;
  width = 0;
  height = 0;
  ctx: CanvasRenderingContext2D;
  color = '#000';

  constructor(content: string, left: number, top: number, ctx: CanvasRenderingContext2D) {
    this.content = content;
    this.left = left;
    this.top = top;
    this.ctx = ctx;
    const textMetrics = ctx.measureText(content);
    this.width = textMetrics.width;
    this.height = textMetrics.fontBoundingBoxDescent;
  }

  render = () => {
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(this.content, this.left, this.top);
  };
}