import Char, { IOptions } from './CanvasTextEditorChar';
import Store from './Store';

export default class CanvasTextEditorCompositionChar extends Char {
  isTemp = true;

  constructor(char: string, store: Store, options: IOptions = {}) {
    super(char, store, options);
  }
}