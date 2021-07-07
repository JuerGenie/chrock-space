import type { SvelteComponent } from "svelte";
import type { RouteDefinition } from "svelte-spa-router";
import { push as _push } from "svelte-spa-router";

const pages = import.meta.globEager("./**.svelte");
const routes = {} as RouteDefinition;

console.log("[routes] loading pages: ", Object.keys(pages));
const mods = await Promise.all(
  Object.keys(pages).map(async (key) => {
    const mod = pages[key] as {
      default: SvelteComponent;
      routes: {
        path: string[];
        order?: number;
      };
    };
    console.log(mod);
    if (mod.routes) {
      if (!mod.routes.order) {
        mod.routes.order = -Infinity;
      }
      console.log(
        `[routes] load route: `,
        mod.routes.path,
        ` (from ${key} (${mod.routes.order}))`
      );
      return mod;
    }
  })
);

const sorted = mods
  .filter((mod) => !!mod)
  .sort((a, b) => {
    return a.routes.order > b.routes.order ? -1 : 1;
  });

console.log(
  "[routes] sorted: ",
  sorted.flatMap((mod) => mod.routes.path)
);

sorted.filter((mod) => {
  const target = Array.isArray(mod.routes.path)
    ? mod.routes.path
    : [mod.routes.path];
  target.forEach((r) => (routes[r] = mod.default));
});

console.log("[routes] generate routes: ", routes);

export default routes;
