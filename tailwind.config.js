/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales (estructura) del blueprint
        navy: {
          DEFAULT: "#0A1F44",
          800: "#13284F",
          700: "#1B3560",
        },
        gold: {
          DEFAULT: "#C9A24B",
          dark: "#A8842F",
        },
        cloud: "#F4F6FB",
        // Acentos América Unida
        au: {
          azulclaro: "#3FA9F5",
          azul: "#2453C6",
          verde: "#2F9E6B",
          amarillo: "#F2C230",
          naranja: "#E8842B",
          rojo: "#D23F3F",
          morado: "#7C4DB8",
          cafe: "#8A5A2B",
        },
      },
      fontFamily: {
        heading: ["Montserrat", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeup: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slidein: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        fadeup: "fadeup 0.7s ease-out both",
        slidein: "slidein 1.1s ease-out both",
      },
    },
  },
  plugins: [],
};
