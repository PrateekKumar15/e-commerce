/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable class-based dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light Theme Colors (will be default)
        background: "#cFdFeF", // shade of
        foreground: "#2c1634", // Revolver (Dark Purple/Black for text)
        card: "#fafafa", // Very Light Gray
        "card-foreground": "#2c1634", // Text on cards
        border: "#D1D5DB", // Light Gray

        primary: "#914ad8", // Medium Purple (main accent)
        "primary-foreground": "#FFFFFF", // Text on primary elements (likely white for good contrast)
        secondary: "#8c45cb", // Amethyst (secondary accent)
        "secondary-foreground": "#FFFFFF", // Text on secondary elements

        // Dark Theme Colors - Updated for better darkness and contrast
        "dark-background": "#0D1117", // Even Darker Gray, almost black
        "dark-foreground": "#E5E7EB", // Light Gray for text (like gray-200 for better clarity)
        "dark-card": "#1F2937", // Dark Gray (like gray-800)
        "dark-card-foreground": "#E5E7EB", // Light Gray for text on dark cards
        "dark-border": "#374151", // Medium-Dark Gray (like gray-700)
        "dark-border-hover": "#4B5563", // Added for button hover (like gray-600)

        // Destructive Action Colors
        destructive: "#EF4444", // red-500 for bg or main color
        "destructive-foreground": "#FFFFFF", // White text on destructive bg
        "destructive-hover": "#DC2626", // red-600 for bg hover

        "dark-destructive": "#F87171", // red-400 (lighter red for dark mode primary action on dark bg)
        "dark-destructive-foreground": "#FFFFFF", // White text on dark destructive bg (could be dark if bg is very light red)
        "dark-destructive-hover": "#EF4444", // red-500 for bg hover in dark

        // For text-based destructive links/buttons (where only text color changes):
        "destructive-text": "#EF4444", // red-500
        "destructive-text-hover": "#DC2626", // red-600
        "dark-destructive-text": "#F87171", // red-400
        "dark-destructive-text-hover": "#FBACA6", // red-300 (even lighter for text hover on dark bg)

        // Primary and secondary can often remain the same if they have good contrast
        // on both light and dark backgrounds, or you can define specific dark versions.
        // For now, we assume they work well or will be adjusted with dark:opacity if needed.
        // 'dark-primary': '#914ad8', (If it needs to change for dark mode)
        // 'dark-primary-foreground': '#FFFFFF',
        // 'dark-secondary': '#8c45cb', (If it needs to change for dark mode)
        // 'dark-secondary-foreground': '#FFFFFF',

        // Success Action / Status Colors
        success: "#22C55E", // green-500 for bg or main color
        "success-foreground": "#FFFFFF", // White text on success bg
        "success-hover": "#16A34A", // green-600 for bg hover

        "dark-success": "#4ADE80", // green-400 (lighter green for dark mode)
        "dark-success-foreground": "#1F2937", // Dark text on lighter green
        "dark-success-hover": "#22C55E", // green-500 for bg hover in dark

        // For text-based success indicators:
        "success-text": "#16A34A", // green-600
        "success-text-hover": "#15803D", // green-700
        "dark-success-text": "#4ADE80", // green-400
        "dark-success-text-hover": "#86EFAC", // green-300 (even lighter for text hover on dark bg)
      },
    },
  },
  plugins: [],
};
