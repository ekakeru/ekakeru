"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import LineMdLightDark from "~icons/line-md/light-dark";
import LineMdMoonFilled from "~icons/line-md/moon";
import LineMdSunnyFilled from "~icons/line-md/sunny-filled";

export function ColorSchemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, themes } = useTheme();

  const next = useCallback(() => {
    if (!theme) return;
    const current = themes.indexOf(theme);
    const next = themes[(current + 1) % themes.length];
    if (!next) return;
    setTheme(next);
  }, [theme, themes, setTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button onClick={next} size="icon" variant="outline">
      {theme === "dark" ? (
        <LineMdMoonFilled />
      ) : theme === "light" ? (
        <LineMdSunnyFilled />
      ) : (
        <LineMdLightDark />
      )}
    </Button>
  );
}
