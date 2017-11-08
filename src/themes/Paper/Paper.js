// style
import { css } from "styled-components"
import { exact, min, max, breakpoints } from "./helpers/breakpoint-generator"

// theme css schema
export const Paper = {
  color: {
    brand: "#ed236e",
    foreground: "#2c2c2c",
    background: "#fff",
    highlight: "#fff200"
  },
  opacity: {
    most: 0.85,
    half: 0.5,
    least: 0.125
  },
  effects: {
    borderRadius: {
      // base: multiplier
      small: 0.25,
      med: 0.5
    }
  },
  typography: {
    font: {
      sans: "'Exo 2'",
      serif: "Lora"
    },
    title: {
      auto: css`
        font-family: Arial, sans-serif;
        letter-spacing: 0.005em;
        line-height: ${() => Paper.typography.title.lineHeight}em;
        font-weight: 700;
        margin: 0;
        /* in some cases this vv doesn't work and causes garbage CSS */
        .fonts-loaded-headers & {
          ${() => Paper.typography.title.fontsLoaded};
        }
      `,
      fontsLoaded: css`
        font-family: ${() => Paper.typography.font.sans}, Arial, sans-serif;
        letter-spacing: 0.025em;
        font-weight: 600;
      `,
      lineHeight: 1.15 // base: multiplier
    },
    text: {
      auto: css`
        font-family: Georgia, serif;
        letter-spacing: 0.05em;
        line-height: ${() => Paper.typography.text.lineHeight}em;
        .fonts-loaded & {
          ${() => Paper.typography.text.fontsLoaded};
        }
      `,
      fontsLoaded: css`
        font-family: ${() => Paper.typography.font.serif}, Georgia, serif;
        letter-spacing: 0.025em;
      `,
      lineHeight: 1.75 // base: multiplier
    }
  },
  size: {
    breakpoint: {
      exact,
      min,
      max,
      stops: {
        min: breakpoints.xs[1],
        max: breakpoints.xl[1]
      }
    },
    font: {
      // base: pixels
      l: 23,
      m: 20,
      s: 18,
      xs: 17,
      make: {
        // base: multiplier
        larger: 3,
        normal: 1,
        smaller: 0.85,
        tiny: 0.65
      },
      // automatically set font size based on screen size; should be at the top of most components' css
      auto: css`
        ${min.m`font-size: 	${() =>
          Paper.size.font.m}px;`} ${max.s`font-size: 	${() =>
            Paper.size.font.s}px;`} ${max.xs`font-size: 	${() =>
            Paper.size.font.xs}px;`} ${min.xxl`font-size:	${() =>
            Paper.size.font.l}px;`};
      `
    },
    block: {
      column: {
        maxwidth: {
          // base: pixels
          m: 750,
          l: 820
        },
        safety: 1.5 // base: multiplier
      },
      spacing: 1, // base: multiplier
      border: 8, // base: pixels
      minFigureWIdth: 450 // base: pixels
    }
  },
  layer: {
    overlay: 40,
    card: 30,
    nav: 20,
    up: 10,
    tuck: -1
  },
  elements: {
    thickBorder: () =>
      Paper.size.block.border + "px solid " + Paper.color.foreground
  }
}
