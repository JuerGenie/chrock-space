/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module "*.md" {
  export { SvelteComponentDev as default } from "svelte/internal";
}
