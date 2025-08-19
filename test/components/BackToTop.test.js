// @vitest-environment happy-dom

import { expect, it, describe, vi } from "vitest";
import BackToTop from "../../src/components/BackToTop.svelte";
import { render, fireEvent } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

describe("BackToTop", () => {
  it("should be hidden initially", () => {
    const { getByLabelText } = render(BackToTop);
    const button = getByLabelText("Scroll back to top of page");
    expect(button).toHaveClass("hidden");
  });

  it("should become visible after scrolling past threshold", async () => {
    // Mock scrollTop to be above threshold
    Object.defineProperty(document.documentElement, "scrollTop", {
      value: 600,
      writable: true,
    });

    const { getByLabelText } = render(BackToTop);
    const button = getByLabelText("Scroll back to top of page");

    // Simulate scroll event
    fireEvent.scroll(window);
    await Promise.resolve(); // Wait for Svelte reactivity

    expect(button).not.toHaveClass("hidden");
  });

  it("should remain hidden if scroll is below threshold", async () => {
    // Mock scrollTop to be below threshold
    Object.defineProperty(document.documentElement, "scrollTop", {
      value: 400,
      writable: true,
    });

    const { getByLabelText } = render(BackToTop);
    const button = getByLabelText("Scroll back to top of page");

    // Simulate scroll event
    fireEvent.scroll(window);
    await Promise.resolve(); // Wait for Svelte reactivity

    expect(button).toHaveClass("hidden");
  });

  it("should call scrollToTop when clicked", async () => {
    const { getByLabelText } = render(BackToTop);
    const button = getByLabelText("Scroll back to top of page");
    const scrollIntoViewMock = vi.fn();
    document.documentElement.scrollIntoView = scrollIntoViewMock;

    await userEvent.click(button);

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });
  });
});
