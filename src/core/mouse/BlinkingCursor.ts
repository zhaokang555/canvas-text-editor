import IRenderable from '../IRenderable';
import Store from '../Store';
import Char from '../Char';
import CompositionChar from '../CompositionChar';
import { colorNameToHex, isCtrlOrCmdPressed } from '../Utils';
import { EventType } from './EventEmitter';

const {round} = Math;
const duration = 1000;

enum KeyboardEventKey {
  Backspace = 'Backspace',
  Enter = 'Enter',
}

export default class BlinkingCursor implements IRenderable {
  height = 50;
  startBlinkingTimestamp = 0;
  input: HTMLInputElement;
  fontSize = 50;
  isShow = false;

  get color() {
    return this._color;
  }

  set color(val) {
    this._color = val;
    this.store.eventEmitter.emit(EventType.colorChange, colorNameToHex(val));
  }

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

  private _color = '#000';
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
      input.addEventListener('input', this.onInput);
      input.addEventListener('keydown', this.onKeyDown);
      input.addEventListener('compositionstart', this.onCompositionStart);
      input.addEventListener('compositionend', this.onCompositionEnd);
    }
    this.input = input;
  }

  destructor() {
    if (this.input) {
      this.input.removeEventListener('input', this.onInput);
      this.input.removeEventListener('keydown', this.onKeyDown);
      this.input.removeEventListener('compositionstart', this.onCompositionStart);
      this.input.removeEventListener('compositionend', this.onCompositionEnd);
    }
  }

  move(dx: number, dy: number) {
    this.left += dx;
    this.top += dy;
  }

  show() {
    this.isShow = true;
    this.startBlinkingTimestamp = Date.now();
  }

  hide() {
    this.isShow = false;
    // this.input.blur();
    this.input.value = '';
  }

  getFocus() {
    if (document.activeElement !== this.input) {
      this.input.focus();
    }
  }

  matchCharStyle(char: Char) {
    this.height = char.fontSize;
    this.color = char.color;
    this.fontSize = char.fontSize;
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

  private onInput = (evt: Event) => {
    const inputEvent = evt as InputEvent;
    if (this.store.hasSelectedText()) {
      this.store.deleteSelectedChars();
    }
    if (inputEvent.inputType === 'insertText' && inputEvent.data != null) {
      const char = new Char(inputEvent.data, this.store, {color: this.color, fontSize: this.fontSize});
      this.store.insertChar(char);
    } else if (inputEvent.inputType === 'insertCompositionText') {
      this.store.clearTempCompositionChars();
      if (inputEvent.data != null) {
        const chars = inputEvent.data.split('').map(char => new CompositionChar(char, this.store, {
          color: this.color,
          fontSize: this.fontSize
        }));
        this.store.insertChars(chars);
      }
    }
  };

  private onKeyDown = async (evt: KeyboardEvent) => {
    if (this.store.isComposition) return;

    switch (evt.key) {
      case KeyboardEventKey.Backspace:
        if (this.isShow) {
          this.store.deleteCharBeforeCursor();
        } else if (this.store.hasSelectedText()) {
          this.store.deleteSelectedChars();
        }
        break;
      case KeyboardEventKey.Enter:
        if (this.store.hasSelectedText()) {
          this.store.deleteSelectedChars();
        }
        const char = new Char('\n', this.store, {color: this.color, fontSize: this.fontSize});
        this.store.insertChar(char);
        break;
      case 'c':
        if (isCtrlOrCmdPressed(evt)) {
          await this.store.copySelectedChars();
        }
        break;
      case 'v':
        if (isCtrlOrCmdPressed(evt)) {
          await this.store.paste();
        }
        break;
      case 'x':
        if (isCtrlOrCmdPressed(evt)) {
          await this.store.copySelectedChars();
          this.store.deleteSelectedChars();
        }
        break;
      case 'a':
        if (isCtrlOrCmdPressed(evt)) {
          this.store.selectAllChars();
        }
        break;
    }
  };

  private onCompositionStart = (evt: CompositionEvent) => {
    this.store.isComposition = true;
  };

  private onCompositionEnd = (evt: CompositionEvent) => {
    this.store.isComposition = false;
    this.store.fixTempCompositionChar();
  };
}