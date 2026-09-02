const MOBILE_BREAKPOINT = 636;

export const installMenuScript = () => {
  const menu = document.querySelector(".menu");
  const hamburger = document.querySelector(".hamburger");
  const closeButton = document.querySelector(".menu-close");

  const isMobileView = () => window.innerWidth < MOBILE_BREAKPOINT;

  const setExpanded = (expanded) => {
    menu?.classList.toggle("expanded", expanded);
    if (isMobileView()) {
      menu?.setAttribute("aria-hidden", expanded ? "false" : "true");
    } else {
      menu?.removeAttribute("aria-hidden");
    }
    hamburger?.setAttribute("aria-expanded", expanded ? "true" : "false");
  };

  // Set initial aria state for mobile
  if (isMobileView()) {
    menu?.setAttribute("aria-hidden", "true");
  }

  // Update aria state on resize
  window.addEventListener("resize", () => {
    if (!isMobileView()) {
      menu?.removeAttribute("aria-hidden");
    } else if (!menu?.classList.contains("expanded")) {
      menu?.setAttribute("aria-hidden", "true");
    }
  });

  hamburger?.addEventListener("click", () => {
    setExpanded(true);
    closeButton?.focus();
  });

  closeButton?.addEventListener("click", () => {
    setExpanded(false);
    hamburger?.focus();
  });

  // Close menu on Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu?.classList.contains("expanded")) {
      setExpanded(false);
      hamburger?.focus();
    }
  });
};

installMenuScript();
