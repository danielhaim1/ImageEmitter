/**
 * Class representing an event emitter.
 */
export class ImageEvents {
  constructor() {
    this._events = {};
    this._onceEvents = {};
  }

  /**
   * Registers an event listener for the specified event.
   * @param {string} eventName - The name of the event.
   * @param {Function} listener - The listener function.
   */
  on(eventName, listener) {
    if (typeof eventName !== 'string' || typeof listener !== 'function') return;

    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    if (!this._events[eventName].includes(listener)) {
      this._events[eventName].push(listener);
    }
  }

  /**
   * Registers a one-time event listener for the specified event.
   * @param {string} eventName - The name of the event.
   * @param {Function} listener - The listener function.
   */
  once(eventName, listener) {
    if (typeof eventName !== 'string' || typeof listener !== 'function') return;

    this.on(eventName, listener);
    if (!this._onceEvents[eventName]) {
      this._onceEvents[eventName] = new Set();
    }
    this._onceEvents[eventName].add(listener);
  }

  /**
   * Removes an event listener for the specified event.
   * @param {string} eventName - The name of the event.
   * @param {Function} listener - The listener function.
   */
  off(eventName, listener) {
    if (typeof eventName !== 'string' || typeof listener !== 'function') return;

    let listeners = this._events[eventName];
    if (listeners) {
      this._events[eventName] = listeners.filter(l => l !== listener);
    }
    if (this._onceEvents[eventName]) {
      this._onceEvents[eventName].delete(listener);
    }
  }

  /**
   * Emits an event, calling all registered listeners.
   * @param {string} eventName - The name of the event.
   * @param {Array} [args=[]] - The arguments to pass to the listener functions.
   */
  emitEvent(eventName, args = []) {
    if (typeof eventName !== 'string') return;

    const listeners = (this._events[eventName] || []).slice();
    const onceListeners = this._onceEvents[eventName];
    for (const listener of listeners) {
      listener.apply(this, args);
      if (onceListeners && onceListeners.has(listener)) {
        this.off(eventName, listener);
      }
    }
  }

  /**
   * Removes all event listeners.
   */
  allOff() {
    this._events = {};
    this._onceEvents = {};
  }
}