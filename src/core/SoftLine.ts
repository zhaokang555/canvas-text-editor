import Char from './Char';

export default class SoftLine {
  private offsetY: number;

  constructor(
    public chars: Char[],
    public width: number,
    public height: number,
    public left: number,
    public top: number
  ) {
    this.offsetY = Math.max(...this.chars.map(char => char.textMetrics.fontBoundingBoxAscent));
    this.calcLayoutForChars();
  }

  getFirstNonCtrlChar() {
    if (this.chars[0]) {
      if (this.chars[0].char !== '\n') {
        return this.chars[0];
      } else {
        return this.chars[1] || null;
      }
    }
    return null;
  }

  private calcLayoutForChars = () => {
    let left = this.left;
    this.chars.forEach(char => {
      char.setPosition(left, this.top + this.offsetY);
      left += char.width;
    });
  };
}
