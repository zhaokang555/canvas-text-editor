interface IOptions {
  color?: string;
  fontSize?: number;
}

export default class CanvasTextEditorChar {
  left = 0;
  top = 0;
  width: number;
  height: number;

  color = '#000';
  fontSize = 50;
  textBaseline: CanvasTextBaseline = 'top';

  constructor(private char: string, private ctx: CanvasRenderingContext2D, options: IOptions = {}) {
    // @ts-ignore
    Object.entries(options).forEach(([key, value]) => this[key] = value);
    this.setStyle();
    const textMetrics = ctx.measureText(char);
    this.width = textMetrics.width;
    this.height = textMetrics.fontBoundingBoxDescent;
  }

  setPosition = (left: number, top: number) => {
    this.left = left;
    this.top = top;
  };

  render = () => {
    this.setStyle();
    this.ctx.fillText(this.char, this.left, this.top);
  };

  private setStyle() {
    this.ctx.fillStyle = this.color;
    this.ctx.font = `${this.fontSize}px sans-serif`;
    this.ctx.textBaseline = this.textBaseline;
  }
}