import Char, { IOptions } from './Char';
import Store from './Store';

export default class CompositionChar extends Char {
  isTemp = true;

  constructor(char: string, store: Store, options: IOptions = {}) {
    super(char, store, options);
  }
}