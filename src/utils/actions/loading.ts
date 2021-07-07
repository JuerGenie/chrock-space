import EvaIcon from "../../lib/eva-icon.svelte";
import "./loading.scss";

type LoadingArgument = {
  color?: string;
  text?: string;
  show: boolean;
};

export function loading(node: HTMLElement, argument: LoadingArgument) {
  const loadingWrapper = document.createElement("div");
  loadingWrapper.classList.add("loading-wrapper");
  if (argument.show) {
    loadingWrapper.classList.add("show");
  }

  const icon = new EvaIcon({
    target: loadingWrapper,
    props: {
      name: "eva-star",
      class: "symbol",
    },
  });
  const text = document.createElement("div");
  text.innerText = argument.text || "少女祈祷中";
  loadingWrapper.appendChild(text);

  node.appendChild(loadingWrapper);

  const style = getComputedStyle(node);
  if (!["relative", "absolute"].includes(style.position)) {
    node.style.position = "relative";
  }

  return {
    update(argument: LoadingArgument) {
      if (argument.show) {
        loadingWrapper.classList.add("show");
      } else {
        loadingWrapper.classList.remove("show");
      }
    },
    destroy() {
      icon.$destroy();
      node.removeChild(loadingWrapper);
    },
  };
}
