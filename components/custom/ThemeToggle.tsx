"use client";

import React from "react";
import { Button } from "../ui/button";
import { Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant="outline"
      size="icon"
      className="rounded-full border-0 text-gray-500 "
    >
      <Sun className="h-4 w-4" />
    </Button>
  );
}
