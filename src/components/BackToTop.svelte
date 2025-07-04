<script>
  const scrollTopThreshold = 500;
  let hidden = true;

  function scrollToTop() {
    document.documentElement.scrollIntoView({ behavior: "smooth" });
  }

  function handleOnScroll() {
    hidden = document.documentElement.scrollTop < scrollTopThreshold;
  }
</script>

<svelte:window onscroll={handleOnScroll} />

<button
  class={["back-to-top", { hidden }]}
  on:click={scrollToTop}
  aria-label="Scroll back to top of page"
></button>

<style>
  .back-to-top {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    opacity: 1;
    transition:
      opacity 0.4s,
      visibility 0.4s,
      transform 0.4s;
    user-select: none;
    background-color: transparent;
    cursor: pointer;
    border: 0;
  }

  .back-to-top::after {
    content: "";
    display: block;
    background-image: url("/icons/arrow_circle_up.svg");
    background-size: cover;
    height: 3rem;
    width: 3rem;
  }

  .back-to-top:hover {
    transform: translateY(-0.5rem);
  }

  .back-to-top.hidden {
    opacity: 0;
    visibility: hidden;
  }
</style>
