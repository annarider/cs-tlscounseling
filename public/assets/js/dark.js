(() => {
  // src/assets/js/dark.js
  var darkModeToggle = document.getElementById("dark-mode-toggle");
  function enableDarkMode() {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  }
  function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
  function lockDarkModeState() {
    darkModeToggle.classList.add("transitioning");
    setTimeout(() => {
      darkModeToggle.classList.remove("transitioning");
    }, 300);
  }
  function detectColorScheme() {
    let theme = "light";
    if (localStorage.getItem("theme")) {
      theme = localStorage.getItem("theme");
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme = "dark";
    }
    theme === "dark" ? enableDarkMode() : disableDarkMode();
  }
  detectColorScheme();
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("cs-li-link")) {
      lockDarkModeState();
    }
  });
  darkModeToggle.addEventListener("click", () => {
    if (darkModeToggle.classList.contains("transitioning")) {
      return;
    }
    lockDarkModeState();
    localStorage.getItem("theme") === "light" ? enableDarkMode() : disableDarkMode();
  });
})();
//# sourceMappingURL=dark.js.map
