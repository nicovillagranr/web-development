class Counter {
  #value = 0;

  increment() { this.#value += 1; }
  current() { return this.#value; }
}

const counter = new Counter();
counter.increment();
counter.increment();
console.log('[private-state]', counter.current());
