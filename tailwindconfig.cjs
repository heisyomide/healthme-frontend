module.exports = {
  content: [
    "./app//*.{ts,tsx,js,jsx}",
    "./components//*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#00B6B6",
          light: "#00E0D3",
          dark: "#008F8F",
        }
      },
      boxShadow: {
        'glass': '0 8px 40px rgba(2,6,23,0.10)',
        'glow-teal': '0 6px 40px rgba(0, 182, 182, 0.18)'
      }
    },
  },
  plugins: [],
};