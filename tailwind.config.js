/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      screens: {
        sx: { max: "479px" },

        smr: { min: "479px", max: "639px" }, //TRANSFORM 1 with  Mobile

        sm: { min: "639px", max: "767px" }, //TRANSFORM 1 No  Mobile

        md: {
          raw: "(min-width: 767px) and (max-width: 1023px) and (max-height: 767px)",
        },

        mdh: {
          raw: "(min-width: 767px) and (max-width: 1023px) and (min-height: 768px)",
        },

        lg: {
          //TRANSFORM 2
          raw: "(min-width: 1023px) and (max-width: 1279px) and (max-height: 767px)",
        },

        lgh: {
          raw: "(min-width: 1023px) and (max-width: 1279px) and (min-height: 768px)",
        },

        xl: { min: "1280px", max: "1535px" },

        "2xl": { min: "1536px" },
      },
      colors: {
        frontColor: "#545c6e",
        fontfrontColor: "#06152b",
        baseColor: "#EAE9E5",
        borderColor: "#bed1cb",
      },
      transitionDelay: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
        900: "900ms",
      },
      transitionDuration: {
        600: "600ms",
        800: "800ms",
        900: "900ms",
      },
    },
  },
  plugins: [],
};
