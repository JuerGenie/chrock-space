<script lang="ts">
  export let type: "primary" | "secondary" | "normal" | "text" = "normal";
  export let classList = "";
  export let disabled = false;
  export let style = "";
  export let title = "";

  let class_list: string[];
  $: {
    class_list = ["chrock-button", type, classList];
    if (disabled) {
      class_list.push("disabled");
    }
  }
</script>

<button class={class_list.join(" ")} on:click {...{ disabled, style, title }}>
  <slot />
</button>

<style lang="scss">
  button {
    cursor: pointer;
    transition: background-color 200ms, color 200ms;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;

    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &.disabled {
      cursor: not-allowed;
    }

    &:not(.text) {
      --button-background-color: var(--secondary-color-lighten-8);
      --button-background-color--hover: var(--secondary-color-lighten-6);
      --button-background-color--disabled: var(--secondary-color-lighten-10);
      --button-text-color--disabled: var(--secondary-color-lighten-6);

      border: none;
      border-radius: var(--border-radius);
      padding: 0.5rem;

      background-color: var(--button-background-color);

      &:hover {
        background-color: var(--button-background-color--hover);
      }

      &.disabled {
        background-color: var(--button-background-color--disabled);
      }
    }
    &.text {
      padding: 0;
      border: none;
      background-color: transparent;
      color: var(--primary-color-darken-1);

      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;

      &:hover {
        color: var(--primary-color);
      }

      &.disabled {
        color: var(--secondary-color-lighten-2);
      }
    }
  }
</style>
