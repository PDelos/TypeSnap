import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sloop: ['Sloop', 'cursive'], 
      },
    },
  },
  plugins: [],
};

export default config;
