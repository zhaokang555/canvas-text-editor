interface IOptions {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  borderColor?: string;
  borderWidth?: number;
}

export class CanvasTextEditor {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  left = 0;
  top = 0;
  width = 400;
  height = 300;
  borderColor = '#999';
  borderWidth = 2;
  backgroundColor = '#fff';

  constructor(canvas: HTMLCanvasElement, options?: IOptions) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    if (options) {
      // @ts-ignore
      Object.entries(options).forEach(([key, value]) => this[key] = value);
    }

    requestAnimationFrame(this.render);
  }

  render = (time: number) => {
    requestAnimationFrame(this.render);
    this.clearCanvas();
    this.renderBorder();
  };

  clearCanvas = () => {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  renderBorder = () => {
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.lineWidth = this.borderWidth;
    this.ctx.strokeRect(this.left, this.top, this.width, this.height);

    this.renderBorderCircle(this.left, this.top);
    this.renderBorderCircle(this.left, this.top + this.height / 2);
    this.renderBorderCircle(this.left, this.top + this.height);
    this.renderBorderCircle(this.left + this.width / 2, this.top);
    this.renderBorderCircle(this.left + this.width / 2, this.top + this.height);
    this.renderBorderCircle(this.left + this.width, this.top);
    this.renderBorderCircle(this.left + this.width, this.top + this.height / 2);
    this.renderBorderCircle(this.left + this.width, this.top + this.height);
  };

  renderBorderCircle = (x: number, y: number) => {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 5, 0, Math.PI * 2);
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fill();
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.stroke();
    this.ctx.closePath();
  };
}