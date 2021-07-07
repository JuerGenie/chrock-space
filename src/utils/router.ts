import { get, readable, Subscriber } from "svelte/store";

let routeCountSetter: Subscriber<number>;
export const routeCount = readable(-1, (set) => {
  routeCountSetter = set;

  return () => (routeCountSetter = null);
});

export function routeCounter() {
  if (routeCountSetter) {
    routeCountSetter(get(routeCount) + 1);
  }
}

const _back = window.history.back.bind(window.history);
window.history.back = () => {
  if (routeCountSetter) {
    routeCountSetter(Math.max(get(routeCount) - 2, -1));
  }
  _back();
};
