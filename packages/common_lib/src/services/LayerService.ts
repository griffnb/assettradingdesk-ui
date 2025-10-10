import { makeAutoObservable } from "mobx";
import type { ComponentType } from "react";

export type Layer<TProps = unknown> = {
  component: ComponentType<TProps>;
  id: string;
  history?: boolean;
  props?: TProps;
};

// type error, alert, saving, success
class LayerServiceClass {
  layers: Layer[] = [];

  private static instance: LayerServiceClass;

  public static getInstance(): LayerServiceClass {
    if (!LayerServiceClass.instance) {
      LayerServiceClass.instance = new LayerServiceClass();
    }

    return LayerServiceClass.instance;
  }

  private constructor() {
    // Initialize your properties here
    makeAutoObservable(this);
  }

  // ---------- replace ----------
  replace(layer: Layer<any>): void;
  replace<TProps>(
    id: string,
    component: ComponentType<TProps>,
    props?: TProps,
    history?: boolean
  ): void;
  replace<TProps>(
    idOrLayer: string | Layer<TProps>,
    component?: ComponentType<TProps>,
    props?: TProps,
    history?: boolean
  ): void {
    const layer: Layer<any> =
      typeof idOrLayer === "object"
        ? idOrLayer
        : { id: idOrLayer, component: component!, props: props!, history };

    const idx = this.layers.findIndex((l) => l.id === layer.id);
    if (idx !== -1) this.layers[idx] = layer;
    else this.layers.push(layer);
  }

  // ---------- add ----------
  add(layer: Layer<any>): void;
  add<TProps>(
    id: string,
    component: ComponentType<TProps>,
    props?: TProps,
    history?: boolean
  ): void;
  add<TProps>(
    idOrLayer: string | Layer<TProps>,
    component?: ComponentType<TProps>,
    props?: TProps,
    history?: boolean
  ): void {
    const layer: Layer<any> =
      typeof idOrLayer === "object"
        ? idOrLayer
        : { id: idOrLayer, component: component!, props: props!, history };

    if (this.layers.find((l) => l.id === layer.id)) {
      // optional: log duplicate
      return;
    }
    this.layers.push(layer);
    this.addState(layer);
  }

  // ---------- addOnly ----------
  addOnly(layer: Layer<any>): void;
  addOnly<TProps>(
    id: string,
    component: ComponentType<TProps>,
    props?: TProps,
    history?: boolean
  ): void;
  addOnly<TProps>(
    idOrLayer: string | Layer<TProps>,
    component?: ComponentType<TProps>,
    props?: TProps,
    history?: boolean
  ): void {
    this.layers = [];
    const layer: Layer<any> =
      typeof idOrLayer === "object"
        ? idOrLayer
        : { id: idOrLayer, component: component!, props: props!, history };

    this.layers.push(layer);
    this.addState(layer);
  }

  remove(id: string | number) {
    const layer = this.layers.find((layer) => layer.id === id);
    if (layer && layer.history) {
      window.history.back();
    }

    this.layers = this.layers.filter((layer) => layer.id !== id);
  }

  removeTop() {
    if (this.layers.length > 0) {
      this.layers.pop();
    }
  }

  removeAbove(id: string) {
    const index = this.layers.findIndex((layer) => layer.id === id);
    if (index !== -1) {
      this.layers = this.layers.slice(0, index + 1);
    }
  }

  removeAll(skipHistory?: boolean) {
    this.layers.forEach((layer) => {
      if (layer.history && !skipHistory) {
        window.history.back();
      }
    });

    this.layers = [];
  }

  //TODO make this work at some point, its complex
  // can change teh url by doing window.history.pushState(null, "", `/brokers/details/${record.id}`);
  addState(layer: Layer) {
    if (layer.history) {
      window.history.pushState({ layerId: layer.id }, "");
    }
  }
}
// Export the single instance
export const LayerService = LayerServiceClass.getInstance();
