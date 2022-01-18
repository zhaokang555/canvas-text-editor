export class CanvasTextEditor {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    // requestAnimationFrame(this.render);
    this.render();
  }

  render = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#000';
    this.ctx.font = '100px sans-serif';
    this.ctx.textBaseline = 'top';
    const text = 'abg';

    const textMetrics = this.ctx.measureText(text);
    console.log(textMetrics);
    const {
      actualBoundingBoxDescent,
      fontBoundingBoxDescent,
      width,
    } = textMetrics;

    const textPos = {x: 100, y: 100};
    this.ctx.fillText(text, textPos.x, textPos.y);
    this.ctx.strokeStyle = 'red';
    this.ctx.strokeRect(
      textPos.x,
      textPos.y,
      width,
      actualBoundingBoxDescent
    );
    this.ctx.strokeStyle = 'green';
    this.ctx.strokeRect(
      textPos.x,
      textPos.y,
      width,
      fontBoundingBoxDescent
    );
  };
}