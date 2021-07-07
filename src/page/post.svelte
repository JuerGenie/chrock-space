<script context="module" lang="ts">
  import type { PostModule } from "../posts/post-meta";

  export const routes = {
    path: ["/post/:id?"],
    order: 1,
  };
</script>

<script lang="ts">
  import EvaIcon from "../lib/eva-icon.svelte";
  import { load } from "../posts/post-meta";
  import { params } from "svelte-spa-router";
  import Gitalk from "gitalk";
  import { onMount } from "svelte";

  let tip = "少女祈祷中";
  let timer = 0;
  let post_promise: Promise<PostModule>;
  $: {
    if ($params) {
      timer = setTimeout(
        () => (tip = "看起来你的网络状况似乎不太好😜"),
        15000
      ) as unknown as number;
      post_promise = load($params.id).finally(() => clearTimeout(timer));
    }
  }

  let gitalkElement: HTMLDivElement;
  let gitalkInstance: Gitalk;
  onMount(() => {
    console.log("create gitalk", {
      clientID: "63ca1562790374a0dc3e",
      clientSecret: "5cd7543274b19bb38582803b95175f2e4b518aec",
      repo: "chrock-space",
      owner: "JuerGenie",
      admin: ["JuerGenie"],
      id: location.pathname,
    });
    // gitalkInstance = new Gitalk({
    //   clientID: "63ca1562790374a0dc3e",
    //   clientSecret: "5cd7543274b19bb38582803b95175f2e4b518aec",
    //   repo: "chrock-space",
    //   owner: "JuerGenie",
    //   admin: ["JuerGenie"],
    //   id: location.pathname,
    // });
  });
</script>

<template>
  {#if post_promise}
    {#await post_promise}
      <div class="loading">
        <EvaIcon name="eva-star" />
        <p>少女祈祷中</p>
      </div>
    {:then post}
      <svelte:component this={post.default} />
    {/await}
  {/if}
  <div bind:this={gitalkElement} />
</template>

<style lang="scss">
  .loading {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    :global .eva {
      font-size: 500%;

      animation: roll 5s infinite ease-in-out;
    }
  }

  @keyframes roll {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(calc(360deg * 15));
    }
  }
</style>
