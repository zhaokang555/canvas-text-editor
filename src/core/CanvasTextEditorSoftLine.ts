import Char from './CanvasTextEditorChar';

export default class CanvasTextEditorSoftLine {
  constructor(
    private chars: Char[],
    public width: number,
    public height: number,
    private ctx: CanvasRenderingContext2D,
    private left: number,
    private top: number
  ) {
    this.calcLayoutForChars();
  }

  private calcLayoutForChars = () => {
    let left = this.left;
    this.chars.forEach(char => {
      char.setPosition(left, this.top);
      left += char.width;
    });
  };
}
