import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        bright: "var(--mantine-color-bright)",
        text: "var(--mantine-color-text)",
        body: "var(--mantine-color-body)",
        error: "var(--mantine-color-error)",
        placeholder: "var(--mantine-color-placeholder)",
        anchor: "var(--mantine-color-anchor)",
        default: "var(--mantine-color-default)",
        "default-hover": "var(--mantine-color-default-hover)",
        "default-color": "var(--mantine-color-default-color)",
        "default-border": "var(--mantine-color-default-border)",
        dimmed: "var(--mantine-color-dimmed)",
      },
      spacing: {
        xs: "var(--mantine-spacing-xs)",
        sm: "var(--mantine-spacing-sm)",
        md: "var(--mantine-spacing-md)",
        lg: "var(--mantine-spacing-lg)",
        xl: "var(--mantine-spacing-xl)",
      },
    },
  },
  plugins: [],
} satisfies Config;
