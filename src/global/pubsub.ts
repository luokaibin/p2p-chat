import dayjs from "dayjs";

type IFn = (...args: unknown[]) => unknown;

type IEvent = {
  [key: string]: IFn[];
};
type ITodo = {
  [key: string]: {
    created: number;
    args: unknown[];
  }[];
};

export class PubSub {
  #eventMap: IEvent = {};
  #todoMap: ITodo = {};
  #duration: number;

  constructor() {
    this.#eventMap = {};
    this.#todoMap = {};
    this.#duration = 0;
  }

  emit(event: string | string[], ...args: unknown[]) {
    event = Array.isArray(event) ? event : [event];
    event.forEach((eventName) => this.#eventPublish(eventName, args));
  }

  #eventPublish(eventName: string, args: unknown[]) {
    if (this.#eventMap[eventName]?.length > 0) {
      return this.#eventMap[eventName]?.forEach((cb) => cb?.(...args));
    }
    this.#todoMap[eventName] = this.#todoMap[eventName] || [];
    const created = dayjs().valueOf();
    this.#todoMap[eventName].push({ args, created });
  }
  #off = (fn: IFn) => {
    const scope = fn.prototype._scope;
    const id: string = fn.prototype._id;
    scope.forEach((eventName: string) => {
      this.#eventMap[eventName] = this.#eventMap[eventName].filter(
        (fn) => fn.prototype._id !== id,
      );
    });
  };

  async #checkTodo(eventName: string | string[]) {
    eventName = Array.isArray(eventName) ? eventName : [eventName];
    eventName.forEach((event) => {
      if (this.#todoMap[event]?.length > 0) {
        const curr = dayjs().valueOf();
        this.#todoMap[event] = this.#todoMap[event].filter(
          (item) => curr - item.created < this.#duration,
        );
        this.#todoMap[event].forEach((i) => {
          this.#eventPublish(event, i.args);
        });
        this.#todoMap[event] = [];
      }
    });
  }

  on(eventName: string | string[], fn: IFn) {
    if (typeof fn !== "function") {
      throw new Error("The function 'fn' does not exist.");
    }
    eventName = Array.isArray(eventName) ? eventName : [eventName];
    fn.prototype = {
      _id: Symbol(),
      _scope: eventName
    }
    eventName.forEach((event) => {
      this.#eventMap[event] = this.#eventMap[event] || [];
      this.#eventMap[event].push(fn);
    });
    this.#checkTodo(eventName);
    return () => this.#off(fn);
  }
  getEventSubscribers(eventName: string) {
    return this.#eventMap[eventName];
  }
}
