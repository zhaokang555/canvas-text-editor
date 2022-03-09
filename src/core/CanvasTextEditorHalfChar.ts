import ClickableZone from './mouse/ClickableZone';
import MousedownZone from './mouse/MousedownZone';

export default class CanvasTextEditorHalfChar {
  mousedownZone: MousedownZone;

  constructor(public clickableZone: ClickableZone) {
    this.mousedownZone = new MousedownZone(/* todo */);
  }

  setPosition(left: number, top: number) {
    // todo
  }
}