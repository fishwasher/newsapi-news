<script>
  import Spinner from "./Spinner.svelte";
  import Articles from "./Articles.svelte";
  import { loadFeed } from "../js/api";
  import getLogger from "../js/logger";
  import { onMount } from "svelte";

  const log = getLogger("App", 0);

  onMount(() => {
    log(`App mounted`);
    loadFeed();
  });
</script>

<main>
  <Articles />
  <Spinner />
</main>

<style global lang="less">
  @import "../styles/global.less";

  main {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
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
