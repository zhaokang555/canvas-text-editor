import CursorType from './CursorType';

export default class Store {
  mouse = {
    click: {
      topLayerZIndex: -Infinity,
      topLayerCallbacks: [] as Array<() => void>,
    },
    hover: {
      topLayerZIndex: -Infinity,
      topLayerCursorType: CursorType.defaultCursor,
    }
  };

  constructor(public ctx: CanvasRenderingContext2D) {

  }
}