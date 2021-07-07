<script lang="ts">
  import Router, { link, push } from "svelte-spa-router";
  import Space from "./lib/space.svelte";
  import ReturnButton from "./lib/return-button.svelte";

  import routes from "./page/routes";
  import ToTop from "./lib/to-top.svelte";
  import { onMount } from "svelte";
  import ChrockButton from "./lib/chrock/chrock-button.svelte";

  import { routeCount, routeCounter } from "./utils/router";
  import AboutMe from "./lib/about-me.svelte";

  let main: HTMLElement;
  let canToTop = false;

  onMount(() => {
    console.log("init chrock-space, routes: ", routes);
    if (main) {
      main.addEventListener("scroll", () => {
        canToTop = !!main.scrollTop;
      });
    }
  });

  let aboutMe: AboutMe;
  const onClickAboutMe = () => aboutMe.open();

  const navigates = [
    { url: "#/posts?group=VUE", name: "VUE" },
    { url: "#/posts?group=SVELTE", name: "SVELTE" },
    { url: "#/posts?group=笔记", name: "笔记" },
    { url: "#/posts?group=随笔", name: "随笔" },
    { url: "#/posts", name: "文章" },
    { url: "#/picture", name: "画廊" },
  ];
</script>

<template>
  <header>
    <h2 on:click={() => push("#/")}>[*] CHROCK-SPACE</h2>
    <h5>POWERED BY <a href="https://github.com/juergenie">@JUERGENIE</a></h5>
    <Space />
    <h4 style="color: var(--secondary-color);">
      {#each navigates as navigate}
        <a href={navigate.url} use:link>&nbsp;{navigate.name}</a> /
      {/each}
      <ChrockButton type="text" on:click={onClickAboutMe}>关于我</ChrockButton>
    </h4>
  </header>

  <main>
    <div bind:this={main} class="chrock-scroll">
      <Router {routes} on:routeLoading={routeCounter} />
    </div>
  </main>

  {#if $routeCount}
    <ReturnButton />
  {/if}

  {#if canToTop}
    <ToTop target={main} />
  {/if}

  <AboutMe bind:this={aboutMe} />
</template>

<style lang="scss" global>
  body {
    overflow: hidden;
    background-color: var(--primary-color-lighten-5);

    .background-wrapper {
      width: 120%;
      height: 120%;
      position: absolute;
      left: -10%;
      top: -10%;

      background-image: url("./assets/background.jpg");
      background-size: cover;
      background-position: 50% 50%;

      filter: blur(4px);

      box-shadow: inset 0 0 24rem 4rem #000;
    }

    > header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: var(--z-index-header);

      width: 100%;
      height: 4rem;
      padding: 0 2rem;

      display: flex;

      background: var(--background-color);
      color: var(--text-color);

      backdrop-filter: blur(8px);

      h2,
      h4 {
        line-height: 1;
      }
      h2 {
        cursor: pointer;
      }
      h5 {
        margin-left: 1rem;
        line-height: 2.1;
      }
    }

    --main-width: min(80%, 64rem);
    > main {
      position: absolute;
      top: 6rem;
      left: calc(50% - var(--main-width) / 2);
      width: var(--main-width);
      height: calc(100% - 8rem);

      background: var(--background-color);
      border-radius: var(--border-radius);
      backdrop-filter: blur(8px);

      padding: 1rem;

      font-weight: 600;
      font-size: 115%;

      > .chrock-scroll {
        overflow: auto;

        width: 100%;
        height: 100%;
      }
    }

    > .return-button {
      position: absolute;
      right: calc(50% - var(--main-width) / 2 - 6rem);
      top: 6rem;

      width: 4rem;
      height: 4rem;

      font-size: 1.5rem;
    }
    > .to-top-button {
      position: absolute;
      right: calc(50% - var(--main-width) / 2 - 6rem);
      bottom: 2rem;

      width: 4rem;
      height: 4rem;

      font-size: 1.5rem;
    }

    a {
      text-decoration: none;
      font-weight: bold;

      &:link {
        color: var(--primary-color-darken-1);
      }
      &:visited {
        color: var(--secondary-color-darken-1);
      }
    }
  }
</style>
