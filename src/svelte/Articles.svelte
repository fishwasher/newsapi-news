<script>
  import { transformNewsFeed } from "../js/news";
  import { listSize } from "../js/util";
  import { articles } from "../js/stores";

  $: items = transformNewsFeed($articles);
  $: size = listSize(items);
</script>

{#if size}
  <ol>
    {#each items as item}
      <li>
        <a href={item.url} target="_blank" rel="noreferrer,noopener"
          >{item.title}</a
        >
      </li>
    {/each}
  </ol>
{:else}
  <p>No news</p>
{/if}

<style lang="less">
  @import "../styles/variables.less";
  a {
    color: coral;
    text-decoration: none;

    &:visited {
      color: brown;
    }

    &:hover {
      color: cornsilk;
      text-decoration: underline;
    }
  }
</style>
