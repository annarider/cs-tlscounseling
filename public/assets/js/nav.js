(() => {
  // src/assets/js/nav.js
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const normalizedPath = currentPath.endsWith("/") ? currentPath.slice(0, -1) : currentPath;
    const navLinks = document.querySelectorAll(".cs-li-link");
    navLinks.forEach((link) => {
      link.classList.remove("cs-active");
      const linkPath = link.getAttribute("href");
      const normalizedLinkPath = linkPath.endsWith("/") ? linkPath.slice(0, -1) : linkPath;
      if (
        // Check for exact match
        normalizedPath === normalizedLinkPath || // Special case for home page
        normalizedPath === "" && normalizedLinkPath === "" || // Handle root path
        normalizedPath === "" && normalizedLinkPath === "/"
      ) {
        link.classList.add("cs-active");
      }
    });
  }
  document.addEventListener("DOMContentLoaded", setActiveNavLink);
  window.addEventListener("popstate", setActiveNavLink);
  var bodyElement = document.querySelector("body");
  var navbarMenu = document.querySelector("#cs-navigation");
  var hamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");
  function toggleAriaExpanded(element) {
    const isExpanded = element.getAttribute("aria-expanded");
    element.setAttribute(
      "aria-expanded",
      isExpanded === "false" ? "true" : "false"
    );
  }
  function toggleMenu() {
    hamburgerMenu.classList.toggle("cs-active");
    navbarMenu.classList.toggle("cs-active");
    bodyElement.classList.toggle("cs-open");
    toggleAriaExpanded(hamburgerMenu);
  }
  hamburgerMenu.addEventListener("click", toggleMenu);
  navbarMenu.addEventListener("click", function(event) {
    if (event.target === navbarMenu && navbarMenu.classList.contains("cs-active")) {
      toggleMenu();
    }
  });
  function toggleDropdown(element) {
    element.classList.toggle("cs-active");
    const dropdownButton = element.querySelector(".cs-dropdown-button");
    if (dropdownButton) {
      toggleAriaExpanded(dropdownButton);
    }
  }
  var dropdownElements = document.querySelectorAll(".cs-dropdown");
  dropdownElements.forEach((element) => {
    let escapePressed = false;
    element.addEventListener("focusout", function(event) {
      if (escapePressed) {
        escapePressed = false;
        return;
      }
      if (!element.contains(event.relatedTarget)) {
        element.classList.remove("cs-active");
        const dropdownButton = element.querySelector(".cs-dropdown-button");
        if (dropdownButton) {
          toggleAriaExpanded(dropdownButton);
        }
      }
    });
    element.addEventListener("keydown", function(event) {
      if (element.classList.contains("cs-active")) {
        event.stopPropagation();
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleDropdown(element);
      }
      if (event.key === "Escape") {
        escapePressed = true;
        toggleDropdown(element);
      }
    });
    const maxWidthMediaQuery = window.matchMedia("(max-width: 63.9375rem)");
    if (maxWidthMediaQuery.matches) {
      element.addEventListener("click", () => toggleDropdown(element));
    }
  });
  var dropdownLinks = document.querySelectorAll(".cs-drop-li > .cs-li-link");
  dropdownLinks.forEach((link) => {
    link.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        window.location.href = this.href;
      }
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && hamburgerMenu.classList.contains("cs-active")) {
      toggleMenu();
    }
  });
})();
//# sourceMappingURL=nav.js.map
