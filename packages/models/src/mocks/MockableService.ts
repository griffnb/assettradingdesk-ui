type MethodKey<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

export class MockableService<T extends object> {
  private mocks: Map<MethodKey<T>, Function> = new Map();

  addMock<K extends MethodKey<T>>(method: K, fn: T[K]): void {
    this.mocks.set(method, fn as Function);
  }

  removeMock<K extends MethodKey<T>>(method: K): void {
    this.mocks.delete(method);
  }

  clearMocks(): void {
    this.mocks.clear();
  }

  protected wrapMethods(instance: T): void {
    const proto = Object.getPrototypeOf(instance) as T;
    const methods = Object.getOwnPropertyNames(proto) as (keyof T)[];

    for (const method of methods) {
      if (method === "constructor") continue;

      const value = instance[method];
      if (typeof value !== "function") continue;

      const original = value as Function;
      (instance as Record<string, unknown>)[method as string] = (
        ...args: unknown[]
      ) => {
        const mock = this.mocks.get(method as MethodKey<T>);
        return mock ? mock(...args) : original.apply(instance, args);
      };
    }
  }
}
