<script>
  import { busy } from "../js/stores";
</script>

{#if $busy}
  <div class="spinner">
    <div class="spinner-ripple">
      <div />
      <div />
    </div>
  </div>
{/if}

<style lang="less">
  @import "../styles/variables.less";
  
  @spinner-size: 40px;
  @spinner-thickness: 8px;
  @spinner-radius: 120px + @spinner-thickness;
  @spinner-size: @spinner-radius * 2;

  @spinner-color: @c-gray;

  @spinner-top: calc(50vh - @spinner-size / 2);
  @spinner-left: calc(50vw - @spinner-size / 2);

  .spinner {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
  }

  .spinner-ripple {
    display: inline-block;
    position: relative;
    width: @spinner-size;
    height: @spinner-size;
  }
  .spinner-ripple div {
    position: absolute;
    border: @spinner-thickness solid @spinner-color;
    opacity: 1;
    border-radius: 50%;
    animation: spinner-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .spinner-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }

  @keyframes spinner-ripple {
    0% {
      top: @spinner-radius;
      left: @spinner-radius;
      width: 0;
      height: 0;
      opacity: 0.75;
    }
    100% {
      top: 0;
      left: 0;
      width: @spinner-size;
      height: @spinner-size;
      opacity: 0;
    }
  }
</style>
