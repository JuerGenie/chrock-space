<script lang="ts">
  import ChrockButton from "./chrock/chrock-button.svelte";
  import EvaIcon from "./eva-icon.svelte";

  export let target: HTMLElement;

  const to_top = () => {
    target.scrollTo(0, 0);
  };
</script>

<template>
  <ChrockButton classList="to-top-button" on:click={to_top} title="回到顶部">
    <EvaIcon name="eva-navigation-outline" />
  </ChrockButton>
</template>
