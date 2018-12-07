class Store extends EventTarget {

  constructor() {
    super();

    this.values = new Proxy({}, {
      set: (obj, prop, value) => {
        this.dispatchEvent(new CustomEvent('change', {
          detail: {
            prop: prop,
            value: value
          }
        }));
        Reflect.set(obj, prop, value);
        return true;
      }
    });
  }
}

export const store = new Store();
