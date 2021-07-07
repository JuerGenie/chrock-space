<script lang="ts">
  import ChrockDialog from "./chrock/chrock-dialog.svelte";

  import ChrockButton from "./chrock/chrock-button.svelte";
  import EvaIcon from "./eva-icon.svelte";
  import Space from "./space.svelte";

  import avatar from "../assets/avatar.png";
  import ChrockTodo from "./chrock/chrock-todo.svelte";

  let dialog: ChrockDialog;

  export function open() {
    dialog.open(true);
  }
</script>

<ChrockDialog bind:this={dialog} zIndex="calc(var(--z-index--header) + 1)">
  <div class="about-me">
    <header>
      <Space />
      <ChrockButton
        on:click={() => dialog.close()}
        type="text"
        style="line-height: 100%; font-size: 1.2rem;"
      >
        <EvaIcon name="eva-close" />
      </ChrockButton>
    </header>

    <main class="chrock-scroll">
      <div class="avatar-wrapper">
        <h2>JUERGENIE WHANG (王玉)</h2>
        <img
          src={avatar}
          alt="Juergenie's avatar"
          width="200px"
          height="200px"
        />
      </div>
      <div class="content">
        <p>
          一个普通的前端工程师，后端也会点儿，基本是条咸鱼，偶尔画点儿漫画、写点儿小说。
        </p>
        <p>学东西还算快，对新技术挺好奇，大概听说到的都会去尝试一下。</p>
        <span>今年的规划：</span>
        <ul>
          <li>
            <ChrockTodo>在今年内开始做属于自己的个人独立游戏。</ChrockTodo>
          </li>
          <li>
            <ChrockTodo done>
              上传个人漫画。(<a
                href="http://m.muwai.com/info/60517.html"
                target="_blank">已上传</a
              >)
            </ChrockTodo>
          </li>
        </ul>
        <div class="contact-me">
          <hr />
          <div>
            <span>联系我：</span>
            <a href="mailto://juergenie@qq.com" target="_blank">
              <ChrockButton type="text">
                <EvaIcon name="eva-email" />
              </ChrockButton>
            </a>
            <a href="https://github.com/juergenie" target="_blank">
              <ChrockButton type="text">
                <EvaIcon name="eva-github" />
              </ChrockButton>
            </a>
          </div>
        </div>
      </div>
    </main>
  </div>
</ChrockDialog>

<style lang="scss">
  .about-me {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    width: 640px;
    height: 640px;

    background-color: white;

    display: flex;
    flex-direction: column;

    border-radius: var(--border-radius);

    header {
      width: 100%;
      height: 2rem;

      display: flex;

      padding: 0 0.5rem;
      align-items: center;
      background-color: transparent;

      :global {
        > * {
          margin: 0;
        }
      }
    }

    main {
      width: 100%;
      height: calc(100% - 2rem);
      overflow: auto;

      .avatar-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        > h2 {
          margin-top: 0;
        }

        > img {
          border-radius: 50%;
        }
      }

      .content {
        // display: grid;
        // grid-template-columns: auto auto;

        padding: 1rem 4rem;
        // font-size: 1.2rem;
        font-weight: 600;

        // > .fit {
        //   grid-column: 1 / 2;
        // }
      }

      .contact-me {
        width: 100%;
        height: 4rem;
        padding: 1rem 0;

        // display: flex;
        // justify-content: center;
        // align-items: center;
        line-height: 100%;

        > div {
          display: flex;
          align-items: center;

          :global {
            .chrock-button {
              font-size: 1.6rem;
              line-height: 1.6rem;
            }
          }

          > a:not(:first-of-type) {
            margin-left: 0.5rem;
          }
        }
      }
    }
  }
</style>
