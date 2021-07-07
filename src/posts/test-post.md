---
{
  author: "Juergenie",
  update_time: "2021-06-28 18:45:40",
  group: "思路验证",
  tags: ["笔记", "测试"],
}
---
import Template from "./post-template.svelte";

<Template meta={META}>

# Title 1

## Title 2

### Title 3

#### Title 4

##### Title 5

###### Title 6

正文 Content.**正文 Content**.*正文 Content*._正文 Return_.正文 Content.

这是一段正文，用于进行测试，但实际上并没有什么用。

在一段话中，如果需要突出重点，可以使用**加粗这个重点**的方式，比如 `**加粗**`。

少年啊快去创造奇迹！

| Col1 | Col2 | Col3 |
| :--- | :--: | ---: |
| 1    | 2    | 3    |
| 2    | 2    | 3    |

> Comment.\
> Second.

这是一段 `inline code`。

```typescript
const type = 23333; // ...test! 测试测试
function test (i) {
  console.log(`test -> ${i}`);
}
```

- Node
- Node
- Node
    - Node
        - Node
            - Node
              > 23333\
              > 这是一段注释。
- Node

1. Node
2. Node
3. Node
    1. Node
        1. Node
            1. Node
4. Node

[test](http://127.0.0.1:3000)

![alt](/favicon.ico)

- TODO
- [ ] 1
- [ ] 2
- [x] 3

</Template>
