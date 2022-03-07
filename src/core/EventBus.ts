import EventEmitter from './EventEmitter';

export default class EventBus {
  private static eventEmitter = new EventEmitter();

  static get on() {
    return EventBus.eventEmitter.on;
  }

  static get off() {
    return EventBus.eventEmitter.off;
  }

  static get emit() {
    return EventBus.eventEmitter.emit;
  }
}