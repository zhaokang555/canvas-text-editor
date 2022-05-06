export enum EventType {
  colorChange = 'colorChange',
}

export default class EventEmitter {
  callbackListMap = new Map<EventType, Function[]>()

  on(eventName: EventType, cb: Function) {
    let cbList = this.callbackListMap.get(eventName)
    if (cbList == null) {
      this.callbackListMap.set(eventName, [])
      cbList = this.callbackListMap.get(eventName)
    }
    if (Array.isArray(cbList)) {
      cbList.push(cb)
    }
  }

  off(eventName: EventType, cb?: Function) {
    if (cb) {
      this.callbackListMap.delete(eventName)
    } else {
      const cbList = this.callbackListMap.get(eventName)
      if (Array.isArray(cbList)) {
        let i = cbList.findIndex(fn => fn === cb)
        if (i > -1) {
          cbList.splice(i, 1)
        }
      }
    }
  }

  emit(eventName: EventType, ...args: any[]) {
    const cbList = this.callbackListMap.get(eventName)
    if (Array.isArray(cbList)) {
      cbList.forEach(cb => cb(...args))
    }
  }
}

