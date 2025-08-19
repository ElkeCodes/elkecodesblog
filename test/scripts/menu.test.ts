// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { installMenuScript } from "src/scripts/menu";

describe("Hamburger menu toggle", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button class="hamburger"></button>
      <button class="menu-close"></button>
      <div class="menu"></div>
      `;
    installMenuScript();
  });

  it('toggles "expanded" class on menu when hamburger is clicked', async () => {
    const hamburger = document.querySelector(".hamburger") as HTMLElement;
    const menu = document.querySelector(".menu")!;

    expect(menu.classList.contains("expanded")).toBe(false);
    await hamburger.click();
    expect(menu.classList.contains("expanded")).toBe(true);
  });

  it('toggles "expanded" class on menu when menu-close is clicked', async () => {
    const menuClose = document.querySelector(".menu-close") as HTMLElement;
    const hamburger = document.querySelector(".hamburger") as HTMLElement;
    const menu = document.querySelector(".menu")!;

    expect(menu.classList.contains("expanded")).toBe(false);
    await hamburger.click();
    expect(menu.classList.contains("expanded")).toBe(true);
    await menuClose.click();
    expect(menu.classList.contains("expanded")).toBe(false);
  });
});
