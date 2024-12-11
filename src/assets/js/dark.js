//
//    The Dark Mode System
//

// Get references to elements
const darkModeToggle = document.getElementById("dark-mode-toggle");

// helper functions to toggle dark mode
function enableDarkMode() {
  document.body.classList.add("dark-mode");
  localStorage.setItem("theme", "dark");
}

function disableDarkMode() {
  document.body.classList.remove("dark-mode");
  localStorage.setItem("theme", "light");
}

// Prevent transitions during navigation
function lockDarkModeState() {
  darkModeToggle.classList.add("transitioning");

  // Remove the class after navigation is complete
  setTimeout(() => {
    darkModeToggle.classList.remove("transitioning");
  }, 300); // Match this with your transition duration
}

// determines a new users dark mode preferences
function detectColorScheme() {
  // default to the light theme
  let theme = "light";

  // check localStorage for a saved 'theme' variable
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  // check system preferences
  else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    theme = "dark";
  }

  // apply theme
  theme === "dark" ? enableDarkMode() : disableDarkMode();
}

// run on page load
detectColorScheme();

// Add navigation state lock listeners
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("cs-li-link")) {
    lockDarkModeState();
  }
});

// add event listener to the dark mode button toggle
darkModeToggle.addEventListener("click", () => {
  // Prevent rapid toggles
  if (darkModeToggle.classList.contains("transitioning")) {
    return;
  }

  // Lock state during transition
  lockDarkModeState();

  // Toggle dark mode
  localStorage.getItem("theme") === "light"
    ? enableDarkMode()
    : disableDarkMode();
});
