import ClickableZone from './mouse/ClickableZone';
import MousedownZone from './mouse/MousedownZone';
import MouseupZone from './mouse/MouseupZone';

export default class CanvasTextEditorHalfChar {
  private mousedownZone: MousedownZone;
  private mouseupZone: MouseupZone;

  constructor(public clickableZone: ClickableZone, handleMousedown: () => void, handleMouseup: () => void) {
    const {left, top, width, height, store} = clickableZone;
    this.mousedownZone = new MousedownZone(left, top, width, height, handleMousedown, store);
    this.mouseupZone = new MouseupZone(left, top, width, height, handleMouseup, store);
  }

  setPosition(left: number, top: number) {
    this.clickableZone.left = left;
    this.clickableZone.top = top;

    this.mousedownZone.left = left;
    this.mousedownZone.top = top;

    this.mouseupZone.left = left;
    this.mouseupZone.top = top;
  }
}