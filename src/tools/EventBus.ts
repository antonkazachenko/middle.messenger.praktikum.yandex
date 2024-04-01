// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/**
 * Implements an EventBus system for managing events and listeners.
 */
export default class EventBus {
  /**
   * Initializes a new instance of EventBus.
   */
  constructor() {
    this.listeners = {};
  }

  /* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */

  /**
   * Registers an event listener for a specified event.
   *
   * @param {string} event - The event name to listen for.
   * @param {Function} callback - The callback function to execute when the event is emitted.
   */
  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  /**
   * Removes an event listener for a specified event.
   *
   * @param {string} event - The event name to remove the listener from.
   * @param {Function} callback - The callback function to remove from the event.
   * @throws {Error} Throws an error if the event does not exist.
   */
  off(event: string, callback: Function) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  /**
   * Emits an event, causing all registered listeners for that event to be called.
   *
   * @param {string} event - The event to emit.
   * @param {...any} args - Arguments to pass to the event listeners.
   * @throws {Error} Throws an error if the event does not exist.
   */
  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }

  /* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
}
