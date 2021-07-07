import sveltePreprocess from "svelte-preprocess";
import { markdown as markdownPreprocess } from "svelte-preprocess-markdown";
import hljs from "highlight.js";

/**
 * @type { import('@sveltejs/vite-plugin-svelte').Options }
 */
const options = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    markdownPreprocess({
      highlight: (code) => {
        const val = hljs.highlightAuto(code);
        return val.value;
      },
    }),
    sveltePreprocess(),
  ],
  extensions: [".svelte", ".md"],
  compilerOptions: {
    // customElement: true,
    sourcemap: true,
  },
};

export default options;
