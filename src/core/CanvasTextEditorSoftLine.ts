import Char from './CanvasTextEditorChar';

export default class CanvasTextEditorSoftLine {
  private offsetY: number;

  constructor(
    private chars: Char[],
    public width: number,
    public height: number,
    private ctx: CanvasRenderingContext2D,
    private left: number,
    private top: number
  ) {
    this.offsetY = Math.max(...this.chars.map(char => char.textMetrics.fontBoundingBoxAscent));
    this.calcLayoutForChars();
  }

  private calcLayoutForChars = () => {
    let left = this.left;
    this.chars.forEach(char => {
      char.setPosition(left, this.top + this.offsetY);
      left += char.width;
    });
  };
}
