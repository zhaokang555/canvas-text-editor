import Char from './CanvasTextEditorChar';
import SoftLine from './CanvasTextEditorSoftLine';

export default class CanvasTextEditorParagraph {
  softLines: SoftLine[] = [];
  width = 0;
  height = 0;

  constructor(
    private chars: Char[],
    private ctx: CanvasRenderingContext2D,
    private left: number,
    private top: number,
    private maxWidth: number,
  ) {
    this.calcLayoutForSoftLines();
    this.calcLayout();
  }

  private calcLayoutForSoftLines = () => {
    let softLineChars: Char[] = [];
    let softLineWidth = 0;
    let softLineHeight = 0;
    let top = this.top;

    this.chars.forEach((char: Char) => {
      if (softLineChars.length === 0) {
        softLineChars.push(char);
        softLineWidth += char.width;
        softLineHeight = Math.max(softLineHeight, char.height);
      } else {
        if (softLineWidth + char.width <= this.maxWidth) {
          softLineChars.push(char);
          softLineWidth += char.width;
          softLineHeight = Math.max(softLineHeight, char.height);
        } else {
          const softLine = new SoftLine(softLineChars, softLineWidth, softLineHeight, this.ctx, this.left, top);
          this.softLines.push(softLine);
          top += softLineHeight;

          softLineChars = [char];
          softLineWidth = char.width;
          softLineHeight = char.height;
        }
      }
    });

    // 处理最后半行
    if (softLineChars.length > 0) {
      const softLine = new SoftLine(softLineChars, softLineWidth, softLineHeight, this.ctx, this.left, top);
      this.softLines.push(softLine);
    }
  };

  private calcLayout = () => {
    this.width = Math.max(...(this.softLines.map(softLine => softLine.width)));
    this.height = this.softLines.reduce((sum, softLine) => sum + softLine.height, 0);
  };

  render = () => {
    this.chars.forEach(char => char.render());
  };
}