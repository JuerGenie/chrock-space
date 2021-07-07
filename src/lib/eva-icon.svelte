<script context="module" lang="ts">
  import "eva-icons/style/eva-icons.css";
</script>

<script lang="ts">
  export let style: string = "";
  export let name: string;

  let classList: string;
  $: classList = name ? `eva ${name}` : "eva";

  let externalClass = "";
  export { externalClass as class };
</script>

<i class="{classList} {externalClass}" {style} />

<style lang="scss">
  .eva {
    line-height: inherit;
  }
</style>
