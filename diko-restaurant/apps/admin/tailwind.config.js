import sharedConfig from '../../libs/styles/tailwind.config.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "../../libs/ui/src/**/*.{js,jsx}"
  ],
  presets: [sharedConfig],
  theme: {
    extend: {},
  },
  plugins: [],
}