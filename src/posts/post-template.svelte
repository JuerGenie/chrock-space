<script context="module" lang="ts">
  import { link } from "svelte-spa-router";
  import type { PostMetadata } from "./post-meta";
</script>

<script lang="ts">
  export let meta = {} as PostMetadata;
</script>

<template>
  <div class="post-header">
    <h1>
      [<a href="#/posts?group={meta.group}" use:link>{meta.group}</a>] {meta.title}
    </h1>
    <div class="post-header--info">
      <div>作者</div>
      <div>{meta.author}</div>
    </div>
    <div class="post-header--info">
      <div class="post-header--info--left">更新时间</div>
      <div class="post-header--info--right">{meta.update_time}</div>
    </div>
    <div class="post-header--info">
      <div class="post-header--info--left">标记</div>
      <div class="post-header--info--right">
        {#each meta.tags as tag}
          <a class="post-header--info--tag" href="/posts?tag={tag}" use:link>
            {tag}
          </a>
        {:else}
          --
        {/each}
      </div>
    </div>
  </div>
  <hr />
  <div class="post-body">
    <slot />
  </div>
</template>

<style lang="scss">
  @use "sass:math";

  .post-header {
    padding: 0 2rem;
    margin-bottom: 1rem;

    &--info {
      width: 100%;
      margin-bottom: 0.5rem;
      font-size: 1rem;

      display: grid;
      grid-template-columns: 5rem auto;
      grid-template-areas: "left right";

      > div:first-of-type {
        grid-area: left;
        text-align: right;
      }
      > div:not(:first-of-type) {
        grid-area: right;

        &::before {
          content: ":";
          margin: 0 0.5rem;
        }
      }
    }
  }

  .post-body {
    padding: 0 2rem;
    line-height: 150%;

    // markdown 文档样式
    :global {
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: "cascatia mono", "Microsoft YaHei UI";
        font-weight: bold;

        position: relative;

        // &::before {
        //   position: absolute;
        //   left: -2rem;
        //   top: calc(55% - 0.5rem);

        //   display: inline-flex;
        //   justify-content: center;

        //   width: 2rem;
        //   height: 1rem;
        //   line-height: 1rem;
        //   font-size: 120%;
        //   color: var(--secondary-color);
        // }
      }

      $content-tag: "";

      @for $i from 1 to 7 {
        h#{$i} {
          margin-top: 4rem * math.pow(0.8, $i - 1);
          font-size: 100% * math.pow(1.1, 6 - $i);
          &::after {
            content: "H#{$i}";
            display: block;
            margin-top: 0.5rem;
            font-size: 0.5rem;
            line-height: 1.2rem;
            width: 2.5rem;
            text-align: center;
            border-radius: 0.6rem;
            background-color: var(--secondary-color-lighten-2);
            color: var(--primary-color-lighten-10);
          }
        }
      }

      // 加粗
      strong {
        background-color: var(--primary-color-lighten-4);
        display: inline-block;
        height: 1.625rem;
      }

      // 行内代码块
      code {
        font-family: var(--code-font-family);
        font-weight: 500;

        color: var(--secondary-color-darken-6);
        background-color: var(--secondary-color-lighten-6);

        margin: 0 0;
        padding: 0 0.25rem;

        border-radius: var(--border-radius--small);
      }

      // 代码块
      pre {
        width: 100%;
        padding: 1rem 1.5rem;
        margin-bottom: 2rem;

        background-color: var(--font-color-dark);
        color: var(--font-color-light);
        border-radius: var(--border-radius);

        position: relative;

        --after-color: transparent;
        --after-bottom: -1rem;
        &:hover {
          --after-color: var(--font-color-dark);
          --after-bottom: -1.5rem;
        }

        code {
          border: none;
          background: none;

          color: var(--secondary-color-lighten-4);

          margin: 0;
          padding: 0;

          &::after {
            content: attr(class);
            color: var(--after-color);
            transition: color 500ms, bottom 500ms;
            // background-color: var(--secondary-color);
            // padding: 0.5rem;
            border-radius: var(--border-radius);

            font-size: 80%;
            line-height: 100%;
            text-align: right;
            position: absolute;
            bottom: var(--after-bottom);
            right: 0.5rem;

            height: 1rem;
            width: 15rem;
          }

          .hljs-keyword {
            color: hsl(300, 30%, 70%);
          }

          .hljs-function {
            .hljs-title {
              color: hsl(210, 55%, 70%);
            }
          }

          .hljs-number {
            color: hsl(15, 90%, 70%);
          }

          .hljs-string {
            color: hsl(80, 70%, 70%);

            .hljs-subst {
              color: hsl(200, 100%, 80%);
            }
          }

          .hljs-built_in {
            color: hsl(40, 100%, 70%);
          }

          .hljs-comment {
            color: hsl(230, 15%, 50%);
            font-style: italic;
          }
        }
      }

      // 表格
      table {
        border-collapse: collapse;

        th,
        td {
          padding: 0.5rem 1rem;

          transition: background-color 200ms;

          &:hover {
            background-color: var(--secondary-color-lighten-5);
          }
        }

        thead {
          tr {
            th {
              border-bottom: 2px solid var(--primary-color-darken-1);
              font-family: "cascadia code", "Microsoft YaHei Light", sans-serif;
              font-weight: bold;
            }
          }
        }

        tbody {
          tr:not(:first-of-type) {
            td {
              border-top: 1px solid var(--primary-color-darken-1);
            }
          }
        }
      }

      // 引用块
      blockquote {
        margin: 0.5rem 0;

        background-color: var(--secondary-color-lighten-6);
        font-weight: 500;

        border-radius: var(--border-radius);
        position: relative;
        padding: 0.25rem 1rem 0.25rem 2rem;

        &::before {
          content: "　";
          text-align: center;
          width: 0.5rem;
          height: 100%;
          background-color: var(--secondary-color);
          position: absolute;
          top: 0;
          left: 0;
        }

        code {
          color: var(--secondary-color-darken-6);
          background-color: var(--secondary-color-lighten-4);
        }
      }

      // 列表
      ol ol,
      ul ul {
        margin-block-start: 0.5rem;
      }
      ol,
      ul {
        li:not(:first-of-type) {
          margin-block-start: 0.5rem;
        }
      }

      img {
        text-align: center;
      }
    }
  }
</style>
