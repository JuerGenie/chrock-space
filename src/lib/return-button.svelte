<script lang="ts">
  import { pop } from "svelte-spa-router";
  import ChrockButton from "./chrock/chrock-button.svelte";
  import EvaIcon from "./eva-icon.svelte";
</script>

<template>
  <ChrockButton classList="return-button" on:click={pop} title="后退">
    <EvaIcon name="eva-undo-outline" />
  </ChrockButton>
</template>
