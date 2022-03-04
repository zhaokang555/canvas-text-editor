import Char from './CanvasTextEditorChar';

export default class CanvasTextEditorSoftLine {
  private offsetY: number;

  constructor(
    public chars: Char[],
    public width: number,
    public height: number,
    private ctx: CanvasRenderingContext2D,
    public left: number,
    public top: number
  ) {
    this.offsetY = Math.max(...this.chars.map(char => char.textMetrics.fontBoundingBoxAscent));
    this.calcLayoutForChars();
    this.chars.forEach((char, i) => {
      char.prev = this.chars[i - 1] || null;
    });
  }

  private calcLayoutForChars = () => {
    let left = this.left;
    this.chars.forEach(char => {
      char.setPosition(left, this.top + this.offsetY);
      left += char.width;
    });
  };
}
