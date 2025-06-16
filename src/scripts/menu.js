document.querySelectorAll(".hamburger, .menu-close").forEach((element) =>
  element.addEventListener("click", () => {
    document.querySelector(".menu")?.classList.toggle("expanded");
  })
);
