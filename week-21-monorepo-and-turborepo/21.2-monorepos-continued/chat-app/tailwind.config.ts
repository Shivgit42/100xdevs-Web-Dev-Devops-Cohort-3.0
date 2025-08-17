import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./apps/web/**/*.{js,ts,jsx,tsx}",
    "./packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
