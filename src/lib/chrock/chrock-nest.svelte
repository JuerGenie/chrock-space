<script context="module" lang="ts">
  // interface NestLine {
  //   id: number;
  //   start: Point;
  //   end: Point;
  //   start_neighber: NestLine[];
  //   end_neighber: NestLine[];
  // }
  interface NestPoint {
    id: number;
    position: Point;
    neighber: Array<{
      switch: boolean;
      point: NestPoint;
    }>;
  }
  type Point = [number, number];
  type PointPositionMap = {
    [key in `${number},${number}`]: NestPoint;
  };
</script>

<script lang="ts">
  import { onMount } from "svelte";

  export let seed: number = Date.now();
  export let style: string = "";
  export let radius: number = 25;
  $: {
    if (radius < 25) {
      radius = 25;
    }
    radius = Math.round(radius / 25) * 25;
  }

  let x_chunk: number;
  let y_chunk: number;
  $: {
    x_chunk = Math.round(Math.pow((radius / 25) * 16, 0.5));
    y_chunk = Math.round(Math.pow((radius / 25) * 9, 0.5)) + radius;
  }
  let correction: number;
  $: {
    correction = seed & 1;
  }

  let center: Point = [0, 0];
  let x_offset: number;
  let y_offset: number;
  $: {
    x_offset = center[0] % x_chunk;
    y_offset = (center[1] % y_chunk) + y_chunk / 2;
  }

  // function get_point([x, y]: Point): Point {
  //   const new_x = Math.round((x + x_offset) / x_chunk) * x_chunk;
  //   let new_y = Math.round((y + y_offset) / y_chunk) * y_chunk;
  //   let ref_y;
  //   if (new_y !== y) {
  //     ref_y = (
  //       new_y < y
  //         ? [new_y + radius, new_y + y_chunk - radius]
  //         : [new_y - radius, new_y - y_chunk + radius]
  //     )[y_correction];
  //   }
  //   return [
  //     new_x - x_offset,
  //     (y - new_y < y - ref_y ? new_y : ref_y) - y_offset,
  //   ];
  // }

  // const lines = [] as NestLine[];
  // const start_lines = {} as Record<`${number},${number}`, NestLine[]>;
  // const end_lines = {} as Record<`${number},${number}`, NestLine[]>;
  const nodes = [] as NestPoint[];
  const node_position_map = {} as PointPositionMap;

  function angle(a: number): number {
    return (Math.PI / 180) * a;
  }

  function generate_nodes() {
    const wait_handle_point = [center] as Point[];

    let id = 1;
    while (wait_handle_point.length) {
      const [x, y] = wait_handle_point.shift();
      const base_angle = Math.round(x / x_chunk) % 2 === correction ? 0 : 60;

      const node = {
        id: id++,
        position: [x, y],
        neighber: [],
      } as NestPoint;

      for (let a = 0; a < 360; a += 120) {
        const p: Point = [
          Math.round(x + radius * Math.sin(angle(a + base_angle))),
          Math.round(y + radius * Math.cos(angle(a + base_angle))),
        ];
        wait_handle_point.push(p);
      }

      nodes.push(node);
      node_position_map[`${x},${y}`] = node;
    }
  }

  let canvas: HTMLCanvasElement;
  function calc_canvas_size() {
    if (canvas.parentElement) {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;

      center = [Math.floor(canvas.width / 2), Math.floor(canvas.height / 2)];
    }
  }

  let context: CanvasRenderingContext2D;
  onMount(() => {
    calc_canvas_size();
    context = canvas.getContext("2d");

    generate_nodes();
  });
</script>

<canvas {style} bind:this={canvas} width="100" height="100" />

<style>
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
