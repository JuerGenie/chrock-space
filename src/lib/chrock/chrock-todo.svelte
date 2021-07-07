<script lang="ts">
  export let done = false;
  export let doing = false;
</script>

<label>
  <input type="checkbox" disabled checked={done} indeterminate={doing} />
  <slot />
</label>

<style lang="scss">
  label {
    line-height: inherit;
    min-height: 1rem;
    vertical-align: middle;

    > input[type="checkbox"] {
      margin: 0;
    }
  }
</style>
