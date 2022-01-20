export class CanvasTextEditorText {
  lines: string[] = [];
  left = 0;
  top = 0;
  width = 0;
  height = 0;
  lineHeight = 0;
  ctx: CanvasRenderingContext2D;
  maxAvailableWidth: number;

  fillStyle = '#000';
  font = '100px sans-serif';
  textBaseline: CanvasTextBaseline = 'top';

  constructor(content: string, left: number, top: number, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.left = left;
    this.top = top;
    this.ctx = ctx;
    this.maxAvailableWidth = canvas.width - this.left;
    this.setTextStyle();
    const textMetrics = ctx.measureText(content);
    this.lineHeight = textMetrics.fontBoundingBoxDescent;
    if (this.maxAvailableWidth >= textMetrics.width) {
      this.lines = [content];
      this.width = textMetrics.width;
    } else {
      this.lines = this.splitContentIntoLines(content);
      this.width = this.maxAvailableWidth;
    }
    this.height = this.lineHeight * this.lines.length;
  }

  render = () => {
    this.setTextStyle();
    this.lines.forEach((line, i) => {
      this.ctx.fillText(line, this.left, this.top + this.lineHeight * i);
    });
  };

  private splitContentIntoLines(content: string) {
    if (content.length <= 1) return [content];

    const lines: string[] = [];
    for (
      let startIndex = 0, endIndex = 1, subContent = content.substring(0, 1);
      startIndex < content.length;
      startIndex = endIndex - 1
    ) {
      subContent = content.substring(startIndex, endIndex);
      for (; endIndex <= content.length; ++endIndex) {
        const tempSubContent = content.substring(startIndex, endIndex);
        if (this.ctx.measureText(tempSubContent).width <= this.maxAvailableWidth) {
          subContent = tempSubContent;
        } else {
          break;
        }
      }
      lines.push(subContent);
    }
    return lines;
  }

  private setTextStyle() {
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.font = this.font;
    this.ctx.textBaseline = this.textBaseline;
  }
}