import { Sugar } from "@roast-cms/react-sugar-styled"
const glazed = {
  color_brand: "rgb(237, 35, 110)",
  color_foreground: "rgb(44, 44, 44)",
  color_highlight: "rgb(255, 242, 0)",
  font_heading: "'Exo 2', Arial, sans-serif",
  font_heading_weight: 600,
  font_body: "'Lora', Georgia, serif",
  size_base: 20,
  size_column_medium: 750,
  size_column_large: 820,
  size_block_padding: 1.5,
  size_block_spacing: 1,
  size_block_border: 8,
  effects_border_radius: 0.5
}
export const APP_THEME = {
  ...Sugar(glazed),
  elements: {
    thickBorder: () =>
      glazed.size_block_border + "px solid " + glazed.color_foreground
  },
  size: {
    ...Sugar(glazed).size,
    font: {
      ...Sugar(glazed).size.font,
      make: {
        ...Sugar(glazed).size.font.make,
        larger: 3,
        tiny: 0.65
      }
    }
  }
}
