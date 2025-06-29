<script>
  const scrollTopThreshold = 150;
  let hidden = true;

  function scrollToTop() {
    document.body.scrollIntoView({ behavior: "smooth" });
  }

  function handleOnScroll() {
    let scrollContainer = document.documentElement || document.body;
    if (!scrollContainer) {
      return;
    }
    hidden = scrollContainer.scrollTop < scrollTopThreshold;
  }
</script>

<svelte:window onscroll={handleOnScroll} />

<button
  class="back-to-top"
  on:click={scrollToTop}
  class:hidden
  aria-label="Scroll back to top"
></button>

<style>
  .back-to-top {
    opacity: 1;
    transition:
      opacity 0.5s,
      visibility 0.5s;
    position: fixed;
    user-select: none;
    right: 1rem;
    bottom: 1rem;
    background-color: transparent;
    border: 0;
  }

  .back-to-top::after {
    content: "";
    background-image: url("/icons/up.svg");
    background-size: cover;
    display: block;
    height: 2rem;
    width: 2rem;
  }

  .back-to-top.hidden {
    opacity: 0;
    visibility: hidden;
  }
</style>
