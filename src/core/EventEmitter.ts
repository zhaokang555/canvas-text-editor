export default class EventEmitter {
  private eventNameAndCallbackListMap = new Map<string, Array<(...args: any[]) => void>>()

  on(eventName: string, cb: () => void) {
    let cbList = this.eventNameAndCallbackListMap.get(eventName)
    if (cbList == null) {
      this.eventNameAndCallbackListMap.set(eventName, [])
      cbList = this.eventNameAndCallbackListMap.get(eventName)
    }
    if (Array.isArray(cbList)) {
      cbList.push(cb)
    }
  }

  off(eventName: string, cb: (() => void) | null = null) {
    // 取消监听事件上的所有回调
    if (cb == null) {
      this.eventNameAndCallbackListMap.delete(eventName)
    // 取消监听事件上的单个回调
    } else {
      let cbList = this.eventNameAndCallbackListMap.get(eventName)
      if (Array.isArray(cbList)) {
        let i = cbList.findIndex(fn => fn === cb)
        if (i > -1) {
          cbList.splice(i, 1)
        }
      }
    }
  }

  emit(eventName: string, ...args: any[]) {
    let callbackList = this.eventNameAndCallbackListMap.get(eventName)
    if (Array.isArray(callbackList)) {
      callbackList.forEach(fn => fn(...args))
    }
  }
}