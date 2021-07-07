import type { SvelteComponent } from "svelte";

import { wait } from "../utils/wait";
import qs from "qs";

export type PostMetadata = {
  title: string;
  author: string;
  update_time: string;
  tags: string[];
  group: string;
};

export type PostModule = {
  META: PostMetadata;
  default: SvelteComponent;
};

const postList = import.meta.glob("./**.md") as Record<
  string,
  () => Promise<PostModule>
>;

const loadedList = new Map<string, PostModule>();
const postGroups = {} as Record<string, Set<PostModule>>;
const postTags = {} as Record<string, Set<PostModule>>;

export const META = {
  loaded: loadedList,
  groups: postGroups,
  tags: postTags,
  get GROUP_LIST() {
    return Object.keys(postGroups).map((group) => ({
      group,
      count: postGroups[group].size,
    }));
  },
  get TAG_LIST() {
    return Object.keys(postTags).map((tag) => ({
      tag,
      count: postTags[tag].size,
    }));
  },
};

function pushOrCreate(
  target: Record<string, Set<PostModule>>,
  key: string,
  mod: PostModule
) {
  (target[key] = target[key] || new Set()).add(mod);
}

export async function load(id: string): Promise<PostModule | undefined> {
  const key = `./${id}.md`;

  if (loadedList.has(id)) {
    return loadedList.get(id);
  } else if (key in postList) {
    // 加载
    const mod = await postList[key]();
    mod.META.title = id;
    console.log("[posts] load post: ", mod.META.title, ` (from ${key})`);
    // 存入缓存
    loadedList.set(id, mod);
    // 存入分组缓存
    pushOrCreate(postGroups, mod.META.group.toLowerCase(), mod);
    // 存入标签缓存
    mod.META.tags.forEach((tag) =>
      pushOrCreate(postTags, tag.toLowerCase(), mod)
    );

    return mod;
  }
}

const reg = /^\.\/(.+)\.md$/;
let current_promise: Promise<unknown>;
async function loadAll() {
  if (current_promise) {
    await current_promise;
    return;
  }
  if (loadedList.size === Object.keys(postList).length) {
    return;
  }
  try {
    if (!current_promise) {
      current_promise = Promise.allSettled(
        Object.keys(postList).map(async (key) => {
          const id = key.match(reg);
          if (id && id[1]) {
            await load(id[1]);
          }
        })
      );
    }
    await current_promise;
  } finally {
    console.log("loaded all -> ", META);
    current_promise = null;
  }
}

function includesIgnoreCase(source: string, target: string): boolean {
  return source.toLowerCase().includes(target.toLowerCase());
}

export type QueryParams = {
  group?: string;
  tag?: string[] | string;
  id?: string;
  paging?: {
    limit: number;
    offset: number;
  };
};
export async function query(params: string): Promise<PostModule[]> {
  const { group, tag, id, paging } = qs.parse(params) as QueryParams;

  // 先将所有文章都加载到，获取到完整元数据后，再进行过滤。
  if (loadedList.size !== Object.keys(postList).length) {
    await loadAll();
  }

  let result = [...loadedList.values()];

  // 全模糊匹配
  if (!group && !tag && !id && params) {
    params = params.toLowerCase();

    result = result.filter(
      (post) =>
        includesIgnoreCase(post.META.group, params) ||
        !!post.META.tags.find((tag) => includesIgnoreCase(tag, params)) ||
        includesIgnoreCase(post.META.title, params)
    );
  } else {
    // 分组过滤
    if (group) {
      result = result.filter((post) =>
        includesIgnoreCase(post.META.group, group.toLowerCase())
      );
    }
    // 标签过滤(and 匹配)
    if (tag) {
      const tags = (Array.isArray(tag) ? tag : [tag]).map((tag) =>
        tag.toLowerCase()
      );
      result = result.filter(
        (post) =>
          tags.length ===
          post.META.tags.filter((t) => tags.includes(t.toLowerCase())).length
      );
    }
    // 标题过滤，模糊匹配
    if (id) {
      result = result.filter((post) => includesIgnoreCase(post.META.title, id));
    }
  }

  // 按更新时间降序排序
  result = result.sort((a, b) =>
    a.META.update_time > b.META.update_time ? -1 : 1
  );

  // 若传入分页参数，进行切分
  if (paging) {
    result = result.slice(paging.offset, paging.limit);
  }

  await wait(Math.random() * 2000);

  return result;
}
