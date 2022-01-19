import { CanvasTextEditorText } from './CanvasTextEditorText';

export class CanvasTextEditor {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  textList: CanvasTextEditorText[] = [];
  mouseX = 0;
  mouseY = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.textList = [
      new CanvasTextEditorText('abcdefghijklmnopqrst', 100, 100, this.ctx),
    ];
    this.ctx.font = '100px sans-serif';
    this.ctx.textBaseline = 'top';
    requestAnimationFrame(this.render);
    this.canvas.addEventListener('mousemove', this.handleMousemove);
  }

  render = (time: number) => {
    requestAnimationFrame(this.render);
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.textList.forEach((text) => text.render());
    if (this.checkMouseIsHoverOnText()) {
      this.canvas.style.cursor = 'text';
    } else {
      this.canvas.style.cursor = 'default';
    }
  };

  handleMousemove = (evt: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = evt.clientX - rect.left;
    this.mouseY = evt.clientY - rect.top;
  };

  checkMouseIsHoverOnText = () => {
    return this.textList.some(text => {
      return this.mouseX >= text.left
        && this.mouseY >= text.top
        && this.mouseX <= text.left + text.width
        && this.mouseY <= text.top + text.height;
    });
  };
}