<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  let dialog: HTMLDialogElement;
  export let onParent = false;
  let oldPosition: string;
  onMount(() => {
    if (dialog.parentElement && onParent) {
      const style = getComputedStyle(dialog.parentElement);
      if (!["relative", "absolute"].includes(style.position)) {
        oldPosition = style.position;
        dialog.parentElement.style.position = "relative";
      }
    }
  });
  onDestroy(() => {
    if (onParent) {
      dialog.parentElement.style.position = oldPosition;
    }
  });

  let wrapper: HTMLDivElement;
  let show = false;
  export function open(reset = false) {
    show = true;
    if (reset) {
      dialog.scroll(0, 0);
    }
  }
  export function close() {
    show = false;
  }

  export let zIndex = "var(--z-index-dialog)";
</script>

<dialog
  bind:this={dialog}
  class="chrock-scroll {show ? 'open' : ''}"
  style="z-index: {zIndex};"
>
  <div
    class="wrapper"
    bind:this={wrapper}
    on:click={(ev) => ev.target === wrapper && close()}
  >
    <slot />
  </div>
</dialog>

<style lang="scss">
  dialog {
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: transparent;
    backdrop-filter: blur(0);

    opacity: 0;

    border: none;
    padding: 0;
    margin: 0;

    transition: background-color 200ms, backdrop-filter 200ms, opacity 200ms;

    display: flex;
    justify-content: center;
    align-items: center;

    pointer-events: none;
    overflow: auto;

    &.open {
      background-color: #0006;
      backdrop-filter: blur(2px);
      opacity: 1;

      pointer-events: all;
    }

    .wrapper {
      min-width: 100%;
      min-height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      display: flex;
    }
  }
</style>
