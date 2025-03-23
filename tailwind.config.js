/** @type {import('tailwindcss').Config} */
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
      extend: {},
    },
    plugins: [require("tailwindcss-animate")],
  };
  