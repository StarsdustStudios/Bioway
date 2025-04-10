/** @type {import('tailwindcss').Config} */

import { fontFamily } from "tailwindcss/defaultTheme"
import { createThemes } from "shadcn-theme"

export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
    "./resources/**/*.tsx",
    "./resources/**/*.vue",
    "./node_modules/@shadcn/ui/dist/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#00A3FF",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", ...fontFamily.sans]
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    createThemes({
      light: {
        primary: "accent",
        background: "white",
        foreground: "black",
      },
      dark: {
        primary: "accent",
        background: "black",
        foreground: "white",
      },
    }),
  ],
};
