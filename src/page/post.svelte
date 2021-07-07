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
  import "gitalk/dist/gitalk.css";

  let tip = "少女祈祷中";
  let timer = 0;
  let post_promise: Promise<PostModule>;
  let id = "";
  $: {
    if ($params) {
      id = $params.id;
      timer = setTimeout(
        () => (tip = "看起来你的网络状况似乎不太好😜"),
        15000
      ) as unknown as number;
      post_promise = load(id).finally(() => clearTimeout(timer));
    }
  }

  let gitalkElement: HTMLDivElement;
  let gitalkInstance: Gitalk;
  $: {
    if (id && !gitalkInstance) {
      gitalkInstance = new Gitalk({
        clientID: "63ca1562790374a0dc3e",
        clientSecret: "5cd7543274b19bb38582803b95175f2e4b518aec",
        repo: "chrock-space",
        owner: "JuerGenie",
        admin: ["JuerGenie"],
        id: `chrock-space-${location.hash}`,
        title: id,
      });
      gitalkInstance.render(gitalkElement);
    }
  }
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
  <hr />
  <div class="gitalk" bind:this={gitalkElement} />
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

  .gitalk {
    padding: 0 2rem;
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
