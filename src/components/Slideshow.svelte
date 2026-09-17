<script>
  /** @type {number} */
  export let count;

  let activeIndex = 0;
  /** @type {HTMLElement | null} */
  let slidesEl = null;
  let scrollTimeout;

  function goTo(index) {
    if (!slidesEl) return;
    const clamped = Math.max(0, Math.min(count - 1, index));
    slidesEl.scrollTo({
      left: clamped * slidesEl.clientWidth,
      behavior: "smooth",
    });
  }

  function handleKeydown(event) {
    if (event.key === "ArrowRight") goTo(activeIndex + 1);
    if (event.key === "ArrowLeft") goTo(activeIndex - 1);
  }

  function handleScroll() {
    if (!slidesEl) return;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      activeIndex = Math.round(slidesEl.scrollLeft / slidesEl.clientWidth);
      updateActiveSlideClass();
    }, 80);
  }

  function updateActiveSlideClass() {
    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === activeIndex);
    });
  }

  import { onMount } from "svelte";

  onMount(() => {
    slidesEl = document.querySelector(".slides");
    updateActiveSlideClass();
    slidesEl?.addEventListener("scroll", handleScroll, { passive: true });
    return () => slidesEl?.removeEventListener("scroll", handleScroll);
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="slide-dots" role="tablist" aria-label="Slide navigation">
  {#each Array(count) as _, index}
    <button
      class={["dot", { active: index === activeIndex }]}
      role="tab"
      aria-selected={index === activeIndex}
      aria-label={`Go to slide ${index + 1}`}
      on:click={() => goTo(index)}
    ></button>
  {/each}
</div>

<style>
  .slide-dots {
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.6rem;
    z-index: 10;
  }

  .dot {
    width: 0.6rem;
    height: 0.6rem;
    padding: 0;
    border-radius: 100%;
    background: var(--color-lighter-gray);
    border: 1px solid var(--color-primary-dark-hover);
    transition:
      background-color 0.3s,
      transform 0.3s;
  }

  .dot:hover {
    cursor: pointer;
    transform: scale(1.2);
  }

  .dot.active {
    background: var(--color-primary);
  }
</style>
