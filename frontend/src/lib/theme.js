// Mapping theme colors to CSS variable names
// We use the names from tailwind.config.js for clarity
const lightThemeColors = {
  "--background": "#FFFFFF",
  "--foreground": "#2c1634",
  "--card": "#F9FAFB",
  "--card-foreground": "#2c1634",
  "--border": "#D1D5DB",
  "--primary": "#914ad8",
  "--primary-foreground": "#FFFFFF",
  "--secondary": "#8c45cb",
  // Add others if needed (destructive, success, etc.)
};

const darkThemeColors = {
  "--background": "#111827",
  "--foreground": "#E5E7EB",
  "--card": "#1F2937",
  "--card-foreground": "#E5E7EB",
  "--border": "#374151",
  "--primary": "#914ad8",
  "--primary-foreground": "#FFFFFF",
  "--secondary": "#8c45cb",
  // Add others if needed
};

// Function to apply the theme AND set CSS variables
const applyTheme = (theme) => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark"); // Remove previous theme class
  root.classList.add(theme); // Add new theme class
  localStorage.setItem("theme", theme); // Save preference

  // Set CSS variables
  const colorsToApply = theme === "dark" ? darkThemeColors : lightThemeColors;
  for (const [key, value] of Object.entries(colorsToApply)) {
    root.style.setProperty(key, value);
  }
};

// Function to get the initial theme
export const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }
  // Check for system preference
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light"; // Default to light theme
};

// Function to toggle the theme
export const toggleTheme = () => {
  const currentTheme = localStorage.getItem("theme") || getInitialTheme(); // Ensure we have a current theme
  const newTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(newTheme);
  return newTheme;
};

// Apply the initial theme AND variables when the script loads
applyTheme(getInitialTheme());
