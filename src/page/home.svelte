<script context="module" lang="ts">
  export const routes = {
    path: ["/", "/home"],
  };
</script>

<script lang="ts">
  import ChrockButton from "../lib/chrock/chrock-button.svelte";
  import avatar from "../assets/avatar.png";
  import { link } from "svelte-spa-router";
  import EvaIcon from "../lib/eva-icon.svelte";

  const navigates = [
    { url: "#/posts", name: "文章", icon: "eva-file-text" },
    { url: "#/picture", name: "画廊", icon: "eva-image" },
    { url: "#/posts?group=随笔", name: "随笔", icon: "eva-settings" },
    { url: "#/application", name: "MINI应用", icon: "eva-cube" },
  ];
</script>

<template>
  <div class="root chrock-scroll">
    <div class="img-frame">
      <h3>JUERGENIE's</h3>
      <h2>AVATAR</h2>
    </div>
    <div class="img">
      <div class="rotate-wrapper">
        <img src={avatar} alt="Juergenie's avatar" />
        <img src={avatar} alt="Juergenie's avatar" />
      </div>
    </div>
    <h1>JUERGENIE WHANG</h1>
    <div class="left-col">
      <div>前端</div>
      <div>业余画手</div>
      <div>业余写手</div>
      <div>画点儿漫画</div>
      <div>写点儿小说</div>
    </div>
    <div class="right-col">
      <div>希望成为独立游戏开发者</div>
      <div>希望能摆脱单身</div>
      <div>希望头发能长回来</div>
    </div>
  </div>
  <div class="navigates">
    {#each navigates as nav}
      <a href={nav.url} use:link>
        <ChrockButton style="width: 7.5rem;">
          <EvaIcon
            style="font-size: 400%;"
            name={nav.icon || "eva-question-mark-circle"}
          />
          <div>{nav.name}</div>
        </ChrockButton>
      </a>
    {/each}
  </div>
</template>

<style lang="scss">
  @use "sass:map";
  @use "sass:list";

  .navigates {
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    padding: 1rem;

    &::before {
      content: "NAVIGATES";

      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;

      font-size: 200%;
      color: var(--secondary-color);
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      padding: 1rem;

      border-radius: var(--border-radius);
      border: 4px dashed var(--secondary-color);
    }
  }

  .root {
    position: relative;
    margin-top: 6rem;
    z-index: 2;

    --avatar-size: 400px;
    --position-offset: var(--avatar-size) / 2;
    --origin-position-x: 50%;
    --origin-position-y: 50%;

    min-height: calc(var(--avatar-size) + 6rem);

    h1 {
      position: absolute;

      top: calc(var(--origin-position-y) - var(--position-offset) - 6rem);

      text-align: center;
      width: 100%;
      height: 3rem;
    }

    .img,
    .img-frame,
    .img > .rotate-wrapper > img {
      width: var(--avatar-size);
      height: var(--avatar-size);
      border-radius: 2rem;

      position: absolute;
      z-index: 2;

      left: calc(var(--origin-position-x) - var(--position-offset));
      top: calc(var(--origin-position-y) - var(--position-offset));
    }
    .img-frame {
      border: 4px dashed var(--secondary-color);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: var(--secondary-color);

      h3 {
        font-size: 3rem;
        margin: 0;
      }
      h2 {
        font-size: 5rem;
        margin: 0;
      }
    }
    .img {
      --animation-offset: 4rem;
      --rotate-offset: 2deg;

      animation: top-to-bottom 12.5s ease-in infinite,
        left-to-right 8s ease-in infinite, rotate-round 10s ease-in-out infinite;

      transform: rotateZ(0);
      perspective: 1000px;

      > .rotate-wrapper {
        animation: rotate-x-y 5s ease-out infinite;
        width: 100%;
        height: 100%;

        // box-shadow: 0 1rem 1rem #000a;

        img {
          opacity: 0.7;
          padding: 0.5rem;

          &:first-of-type {
            z-index: 10;
            mix-blend-mode: overlay;
          }
          &:not(:first-of-type) {
            filter: blur(4px) saturate(150%);
          }
        }
      }
    }

    --summary-width: 260px;
    .left-col,
    .right-col {
      position: absolute;
      width: 40%;
      max-width: var(--summary-width);
      height: var(--avatar-size);
      top: calc(var(--origin-position-y) - var(--position-offset));

      display: flex;
      flex-direction: column;
      justify-content: center;

      > div {
        font-size: 120%;
        margin: 0.25rem;
      }
    }
    .left-col {
      text-align: right;
      left: calc(
        var(--origin-position-y) - var(--position-offset) -
          min(40%, var(--summary-width)) - 2rem
      );
    }
    .right-col {
      text-align: left;
      right: calc(
        var(--origin-position-y) - var(--position-offset) -
          min(40%, var(--summary-width)) - 2rem
      );
    }
  }

  $animations: (
      "name": top-to-bottom,
      "fields": (
        "field": top,
        "left-value":
          calc(
            var(--origin-position-y) - var(--position-offset) -
              var(--animation-offset)
          ),
        "right-value":
          calc(
            var(--origin-position-y) - var(--position-offset) +
              var(--animation-offset)
          ),
      )
      (),
    ),
    (
      "name": left-to-right,
      "fields": (
        "field": left,
        "left-value":
          calc(
            var(--origin-position-x) - var(--position-offset) - 5% -
              var(--animation-offset)
          ),
        "right-value":
          calc(
            var(--origin-position-x) - var(--position-offset) + 5% +
              var(--animation-offset)
          ),
      )
      (),
    ),
    (
      "name": rotate-round,
      "fields": (
        "field": transform,
        "left-value": rotate(calc(-1 * var(--rotate-offset))),
        "right-value": rotate(var(--rotate-offset)),
      )
      (),
    ),
    (
      "name": rotate-x-y,
      "fields": (
        "field": transform,
        "left-value": rotate3d(0.5, 1, 0, -10deg),
        "right-value": rotate3d(0.5, 1, 0, 10deg),
      )
      (
        "field": filter,
        "left-value": brightness(110%) drop-shadow(1rem 1rem 1rem #000a),
        "right-value": brightness(90%) drop-shadow(0rem 1rem 1rem #000a),
      )
      (),
    );

  @for $animation-index from 1 to length($animations) + 1 {
    $current: nth($animations, $animation-index);

    @keyframes #{map-get($current, "name")} {
      $fields: map.get(
        $map: $current,
        $key: "fields",
      );

      0% {
        @for $i from 1 to length($fields) {
          $field: nth($fields, $i);
          #{map-get($map: $field, $key: "field")}: map-get(
            $field,
            "left-value"
          );
        }
      }
      50% {
        @for $i from 1 to length($fields) {
          $field: nth($fields, $i);
          #{map-get($map: $field, $key: "field")}: map-get(
            $field,
            "right-value"
          );
        }
      }
      100% {
        @for $i from 1 to length($fields) {
          $field: nth($fields, $i);
          #{map-get($map: $field, $key: "field")}: map-get(
            $field,
            "left-value"
          );
        }
      }
    }
  }

  // @keyframes #{$name} {
  //   0% {
  //     @for $i from 1 to length($list) {
  //       #{map-get(nth($list, $i), "name")}: map-get($map, "left-value");
  //     }
  //   }
  //   50% {
  //     @for $i from 1 to length($list) {
  //       $map: nth($list, $i);

  //       #{map-get($map, "name")}: map-get($map, "right-value");
  //     }
  //   }
  //   100% {
  //     @for $i from 1 to length($list) {
  //       $map: nth($list, $i);

  //       #{map-get($map, $name)}: map-get($map, $left-value);
  //     }
  //   }
  // }

  // @mixin create-keyframse($name, $list) {
  //   @keyframes #{$name} {
  //     0% {
  //       @for $i from 1 to length($list) {
  //         #{map-get(nth($list, $i), "name")}: map-get($map, "left-value");
  //       }
  //     }
  //     50% {
  //       @for $i from 1 to length($list) {
  //         $map: nth($list, $i);

  //         #{map-get($map, "name")}: map-get($map, "right-value");
  //       }
  //     }
  //     100% {
  //       @for $i from 1 to length($list) {
  //         $map: nth($list, $i);

  //         #{map-get($map, $name)}: map-get($map, $left-value);
  //       }
  //     }
  //   }
  // }

  // @include create-keyframse(
  //   top-to-bottom,
  //   (
  //     "name": top,
  //     "left-value":
  //       calc(
  //         var(--origin-position-y) - var(--position-offset) -
  //           var(--animation-offset)
  //       ),
  //     "right-value":
  //       calc(
  //         var(--origin-position-y) - var(--position-offset) +
  //           var(--animation-offset)
  //       ),
  //   )
  // );

  // @include create-keyframse(
  //   left-to-right,
  //   (
  //     "name": left,
  //     "left-value":
  //       calc(
  //         var(--origin-position-x) - var(--position-offset) -
  //           var(--animation-offset)
  //       ),
  //     "right-value":
  //       calc(
  //         var(--origin-position-x) - var(--position-offset) +
  //           var(--animation-offset)
  //       ),
  //   )
  // );

  // @include create-keyframse(
  //   rotate-round,
  //   (
  //     "name": transform,
  //     "left-value": rotate(calc(-1 * var(--rotate-offset))),
  //     "right-value": rotate(var(--rotate-offset)),
  //   )
  // );

  // @include create-keyframse(
  //   rotate-x-y,
  //   (
  //     "name": transform,
  //     "left-value": rotate3d(0.5, 1, 0, -20deg),
  //     "right-value": rotate3d(0.5, 1, 0, 20deg),
  //   )
  // );

  // @include create-keyframse(
  //   rotate-z,
  //   transform,
  //   rotateZ(0deg),
  //   rotateZ(360deg)
  // );
</style>
