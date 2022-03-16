import IRenderable from '../IRenderable';
import Store from '../Store';
import Char from '../CanvasTextEditorChar';
import CompositionChar from '../CanvasTextEditorCompositionChar';

const {round} = Math;
const duration = 1000;

enum KeyboardEventKey {
  Backspace = 'Backspace',
}

export default class BlinkingCursor implements IRenderable {
  height = 50;
  startBlinkingTimestamp = 0;
  input: HTMLInputElement;
  color = '#000';
  fontSize = 50;
  isShow = false;

  get left() {
    return this._left;
  }

  set left(val) {
    this._left = round(val);
  }

  get top() {
    return this._top;
  }

  set top(val) {
    this._top = round(val);
  }

  private _left = -Infinity;
  private _top = -Infinity;

  constructor(private store: Store) {
    const {container} = this.store;
    let input = container.querySelector('input');
    if (!input) {
      input = document.createElement('input');
      input.style.position = 'absolute';
      input.style.width = '0';
      input.style.padding = '0';
      input.style.border = 'none';
      container.style.position = 'relative';
      container.appendChild(input);
      input.addEventListener('input', evt => {
        const inputEvent = evt as InputEvent;
        if (inputEvent.inputType === 'insertText' && inputEvent.data != null) {
          const char = new Char(inputEvent.data, store, {color: this.color, fontSize: this.fontSize});
          this.store.insertChar(char);
        } else if (inputEvent.inputType === 'insertCompositionText') {
          this.store.clearTempCompositionChars();
          if (inputEvent.data != null) {
            const chars = inputEvent.data.split('').map(char => new CompositionChar(char, store, {
              color: this.color,
              fontSize: this.fontSize
            }));
            this.store.insertChars(chars);
          }
        }
      });
      input.addEventListener('keydown', (evt) => {
        if (evt.key === KeyboardEventKey.Backspace && !this.store.isComposition) {
          this.store.deleteCharBeforeCursor();
        }
      });
      input.addEventListener('compositionstart', () => {
        this.store.isComposition = true;
      });
      input.addEventListener('compositionend', () => {
        this.store.isComposition = false;
        this.store.fixTempCompositionChar();
      });
    }
    this.input = input;
  }

  show() {
    this.isShow = true;
    this.startBlinkingTimestamp = Date.now();
    if (document.activeElement !== this.input) {
      this.input.focus();
    }
  }

  hide() {
    this.isShow = false;
    this.input.blur();
    this.input.value = '';
  }

  checkShouldShow() {
    if (this.store.hasSelectText()) {
      this.hide();
    } else {
      this.show();
    }
  }

  render(): void {
    if (!this.isShow) {
      return;
    }

    const phase = (Date.now() - this.startBlinkingTimestamp) % duration;

    if (phase / duration < 0.5) {
      this.store.ctx.beginPath();
      this.store.ctx.moveTo(this.left, this.top);
      this.store.ctx.lineTo(this.left, this.top + this.height);
      this.store.ctx.strokeStyle = this.color;
      this.store.ctx.lineWidth = 1;
      this.store.ctx.stroke();
    }

    this.input.style.left = this.left + 'px';
    this.input.style.top = this.top + 'px';
    this.input.style.height = this.height + 'px';
  }
}