import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '882px',
    },
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      colors: {
        gray: {
          0: '#F4F4F4',
          1: '#E0E0E0',
          2: '#B8B8B8',
          3: '#929292',
          4: '#6E6E6E',
          5: '#4B4B4B',
          6: '#2B2B2B',
          7: '#111111',
        },
        primary: {
          1: '#6ABE39',
          2: '#49AA19',
          3: '#55AA00',
          4: '#306317',
          5: '#DEEFD5',
        },
        red: {
          1: '#FF0000',
          2: '#Fc4c00',
        },
        yellow: {
          1: '#E3E300',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
