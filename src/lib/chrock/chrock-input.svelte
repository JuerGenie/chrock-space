<script lang="ts">
  export let value: string;
  export let placeholder = "";
</script>

<input bind:value {placeholder} />

<style lang="scss">
  input {
    width: 100%;
    border: none;
    padding: 0.75rem;

    font-size: 1rem;
    font-family: var(--font-family);
    font-weight: bold;
    color: var(--secondary-color-darken-2);

    background-color: transparent;
    border-bottom: 2px solid var(--primary-color-darken-1);

    transition: background-color 200ms, border-color 200ms;

    &:focus-visible,
    &:hover {
      // border-radius: var(--border-radius);
      outline: none;
      background-color: white;
      border-color: transparent;
    }
  }
</style>
