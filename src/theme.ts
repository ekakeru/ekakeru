"use client";

import {
  createTheme,
  type DefaultMantineColor,
  type MantineColorsTuple,
} from "@mantine/core";

type ExtendedCustomColors = "paleBlue" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}

const miku: MantineColorsTuple = [
  "#e4fefa",
  "#d4f7f2",
  "#adece4",
  "#83e1d4",
  "#60d8c7",
  "#49d2bf",
  "#39cfbb",
  "#26b7a4",
  "#13a392",
  "#008e7d",
];

export const theme = createTheme({
  primaryColor: "miku",
  colors: {
    miku: miku,
  },
});
