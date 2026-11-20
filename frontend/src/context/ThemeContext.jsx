import { createContext, useContext, useEffect, useState } from "react";

export const THEMES = [
  {
    id: "dark",
    label: "Solid Black",
    subtitle: "Signature Noir",
    badge: "Noir",
    type: "dark",
    swatch: "#0A0A0A",
    border: "rgba(255,255,255,0.2)",
  },
  {
    id: "glass",
    label: "Frosted Glass",
    subtitle: "Translucent Ambient",
    badge: "Glass",
    type: "dark",
    swatch: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.02))",
    border: "rgba(255,255,255,0.3)",
  },
  {
    id: "warm-white",
    label: "Warm Ivory",
    subtitle: "High-Fashion Cream",
    badge: "Ivory",
    type: "light",
    swatch: "#F7F5F0",
    border: "rgba(0,0,0,0.18)",
  },
];

const ThemeContext = createContext({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("excenius_theme");
      if (saved && THEMES.some((t) => t.id === saved)) {
        return saved;
      }
      return "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("excenius_theme", theme);
    } catch {
      // ignore
    }

    const root = document.documentElement;
    root.setAttribute("data-theme", theme);

    // Maintain backwards compatibility with class names
    THEMES.forEach((t) => root.classList.remove(`theme-${t.id}`));
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  const toggleTheme = () => {
    const currentIndex = THEMES.findIndex((t) => t.id === theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setTheme(THEMES[nextIndex].id);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
