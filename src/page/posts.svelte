<script lang="ts" context="module">
  import { querystring } from "svelte-spa-router";
  import type { PostModule } from "../posts/post-meta";

  export const routes = {
    path: ["/posts"],
    order: 2,
  };
</script>

<script lang="ts">
  import { query } from "../posts/post-meta";
  import { onDestroy, onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import ChrockInput from "../lib/chrock/chrock-input.svelte";
  import { loading } from "../utils/actions/loading";
  import _ from "lodash";

  let postList: PostModule[] = [];

  let searchStr: string;
  let cancel: Function;
  onMount(() => {
    cancel = querystring.subscribe(() => {
      searchStr = decodeURIComponent($querystring);
    });
  });
  onDestroy(() => {
    cancel();
  });

  let tag = 0;
  let show = false;
  const queryPostList = _.throttle(
    async (params: string) => {
      queryPostList.cancel();

      try {
        const now = (tag = Date.now());
        show = true;
        const res = await query(params);
        if (now === tag) {
          postList = res;
          show = false;
        }
      } catch {
        show = false;
      }
    },
    500,
    {
      leading: false,
      trailing: true,
    }
  );

  $: {
    queryPostList(searchStr);
  }
</script>

<div class="posts">
  <div class="search-bar">
    <h1>文章列表 POSTS</h1>
    <ChrockInput
      bind:value={searchStr}
      placeholder="SEARCH (关键字或querystring)"
    />
  </div>
  <div class="post-list chrock-scroll" use:loading={{ show }}>
    {#each postList as post}
      <div class="post">
        <h3>
          <a href="#/post/{post.META.title}">{post.META.title}</a>
          <!-- <ChrockButton
            type="text"
            on:click={() => push(`#/post/${post.META.title}`)}
          >
            {post.META.title}
          </ChrockButton> -->
        </h3>
        <div>
          <div>文章分组</div>
          <div>
            <a href="#/posts?group={post.META.group}" use:link>
              {post.META.group}
            </a>
          </div>
        </div>
        <div>
          <div>更新时间</div>
          <div>{post.META.update_time}</div>
        </div>
        <div>
          <div>标记</div>
          <div>
            {#each post.META.tags as tag}
              <a href="#/posts?tag={tag}" use:link>{tag}</a>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .posts {
    display: flex;
    flex-direction: column;

    height: 100%;

    .search-bar {
      margin-bottom: 1rem;

      h1 {
        margin-top: 0;
        text-align: center;
      }
    }

    .post-list {
      flex: 1;
      overflow: auto;

      .post {
        border-radius: var(--border-radius);
        padding: 1rem;
        transition: background-color 200ms;

        &:hover {
          background-color: var(--secondary-color-lighten-6);
        }

        h3 {
          margin: 0 0 0.5rem 0;

          &::before {
            content: "#";
            color: var(--secondary-color-lighten-2);
            margin-right: 0.5rem;
          }
        }
        > div {
          display: grid;
          grid-template-columns: 5rem auto;
          grid-template-areas: "left right";

          font-size: 1rem;
          padding-left: 0.5rem;

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

            a:not(:first-of-type) {
              margin-left: 1rem;
            }
          }
        }
      }
    }
  }
</style>
