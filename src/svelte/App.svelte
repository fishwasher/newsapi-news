<script>
  import Spinner from "./Spinner.svelte";
  import { newsfeed } from "../js/stores";
  export let name;
</script>

<main>
  <h1>Hello <span>{name}</span>!</h1>
  <Spinner />
</main>

<style global lang="less">
  @import "../styles/global.less";

  main {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }

  h1 {
    .font-regular();
    font-size: 2 * @fs-base;
    color: #777;
    letter-spacing: @fs-base;

    span {
      color: @c-red;
      text-transform: uppercase;
    }
  }
</style>
