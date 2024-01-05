export class ImageEvents {
  constructor() {
    this._events = {};
    this._onceEvents = {};
  }

  on(eventName, listener) {
    if (!eventName || !listener) return;
    this._events[eventName] = this._events[eventName] || [];
    if (!this._events[eventName].includes(listener)) {
      this._events[eventName].push(listener);
    }
  }

  once(eventName, listener) {
    if (!eventName || !listener) return;
    this.on(eventName, listener);
    this._onceEvents[eventName] = this._onceEvents[eventName] || {};
    this._onceEvents[eventName][listener] = true;
  }

  off(eventName, listener) {
    let listeners = this._events[eventName];
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index != -1) {
        listeners.splice(index, 1);
      }
    }
    if (this._onceEvents[eventName]) {
      delete this._onceEvents[eventName][listener];
    }
  }

  emitEvent(eventName, args = []) {
    let listeners = this._events[eventName]?.slice() || [];
    let onceListeners = this._onceEvents[eventName];
    for (let listener of listeners) {
      if (onceListeners && onceListeners[listener]) {
        this.off(eventName, listener);
      }
      listener.apply(this, args);
    }
  }

  allOff() {
    this._events = {};
    this._onceEvents = {};
  }
}
