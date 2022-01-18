import { CanvasTextEditorText } from './CanvasTextEditorText';

export class CanvasTextEditor {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  textList: CanvasTextEditorText[] = [];
  mousePos: { x: number, y: number } = {x: 0, y: 0};

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.textList = [
      new CanvasTextEditorText('abc', 100, 100, this.ctx),
      new CanvasTextEditorText('def', 100, 200, this.ctx),
      new CanvasTextEditorText('ghi', 100, 300, this.ctx),
    ];
    this.ctx.fillStyle = '#000';
    this.ctx.font = '100px sans-serif';
    this.ctx.textBaseline = 'top';
    requestAnimationFrame(this.render);
    this.canvas.addEventListener('mousemove', this.handleMousemove);
  }

  render = (time: number) => {
    requestAnimationFrame(this.render);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.textList.forEach((text) => text.render());
    if (this.checkMouseIsHoverOnText()) {
      this.canvas.style.cursor = 'text';
    } else {
      this.canvas.style.cursor = 'default';
    }
  };

  handleMousemove = (evt: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    this.mousePos.x = evt.clientX - rect.left;
    this.mousePos.y = evt.clientY - rect.top;
  };

  checkMouseIsHoverOnText = () => {
    return this.textList.some(text => {
      return this.mousePos.x >= text.left
        && this.mousePos.y >= text.top
        && this.mousePos.x <= text.left + text.width
        && this.mousePos.y <= text.top + text.height;
    });
  };
}