import ClickZone, { IOptions } from './ClickZone';
import MousedownZone from './MousedownZone';
import MouseupZone from './MouseupZone';
import Store from '../Store';

export default class MouseDownUpClickZone {
  get left() {return this._left;}

  get top() {return this._top;}

  private clickZone: ClickZone;
  private mousedownZone: MousedownZone;
  private mouseupZone: MouseupZone;

  constructor(
    private _left: number,
    private _top: number,
    public width: number,
    public height: number,
    public onClick: (mouseX: number, mouseY: number) => void,
    public onMousedown: (mouseX: number, mouseY: number) => void,
    public onMouseup: (mouseX: number, mouseY: number) => void,
    public store: Store,
    options: IOptions = {},
  ) {
    this.clickZone = new ClickZone(_left, _top, width, height, onClick, store, options);
    this.mousedownZone = new MousedownZone(_left, _top, width, height, onMousedown, store);
    this.mouseupZone = new MouseupZone(_left, _top, width, height, onMouseup, store);
  }

  destructor() {
    this.clickZone.destructor();
    this.mousedownZone.destructor();
    this.mouseupZone.destructor();
  }

  setPosition(left: number, top: number) {
    this._left = left;
    this._top = top;

    this.clickZone.left = left;
    this.clickZone.top = top;

    this.mousedownZone.left = left;
    this.mousedownZone.top = top;

    this.mouseupZone.left = left;
    this.mouseupZone.top = top;
  }
}