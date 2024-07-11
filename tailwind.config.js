/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "3xl": "1800px",
      },
      colors: {
        'pastel-blue': '#9AB3CF',
        'pastel-green': '#9CBDBD',
        'pastel-brown': '#BDAA9C',
        'pastel-purple': '#D3B1BC',
        'pastel-pink': '#F5C8C3',
        'pastel-orange': '#FBDCB7',
      },
    },
  },
  plugins: [],
};
