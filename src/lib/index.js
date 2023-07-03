import { writable } from "svelte/store";

/**
 *
 * @param {object} value
 * @returns { { useStore: import("svelte/store").Writable<T>, useProxy: Proxy } }
 */
export function sveltix(value) {
  let storeObject = { ...value.state() };
  const createStore = writable(removeFunctions(storeObject));

  const handler = {
    set(target, property, newValue) {
      target[property] = newValue;
      createStore.set(removeFunctions(target));
      return true;
    },
    get(target, property) {
      return target[property];
    },
  };

  const proxy = new Proxy(value.state(), handler);

  let bindState = {};

  if ("actions" in value) {
    Object.keys(value.actions).forEach((f) => {
      bindState[f] = value.actions[f].bind(proxy);
    });
  }

  Object.keys(value.state()).forEach((p) => {
    Object.defineProperty(bindState, p, {
      get() {
        return proxy[p];
      },
      set(val) {
        proxy[p] = val;
      },
      enumerable: true,
      configurable: true,
    });
  });

  /**
   * Returns a writable store which can be used in template.
   * @returns {import("svelte/store").Writable<T>}
   */
  bindState.useStore = function () {
    return createStore;
  };

  /**
   * Returns a proxy to read and write from proxy and store.
   * @returns {Proxy}
   */
  bindState.useProxy = function () {
    return proxy;
  };

  const stateProxyHandler = {
    get: handler.get,
    set: handler.set,
  };

  let stateProxy = new Proxy(bindState, stateProxyHandler);

  return stateProxy;
}

function removeFunctions(obj) {
  let newObj = {};

  for (let prop in obj) {
    if (typeof obj[prop] !== "function") {
      newObj[prop] = obj[prop];
    }
  }

  return newObj;
}
