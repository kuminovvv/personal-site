import {useLayoutEffect, useSyncExternalStore} from "react";

const getTheme = () => document.documentElement.classList.contains("dark");
const getServerTheme = () => false;

const subscribeToTheme = (onChange: () => void) => {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== "portfolio-theme") return;
    document.documentElement.classList.toggle("dark", event.newValue === "dark");
    onChange();
  };

  document.addEventListener("portfolio-theme-change", onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    document.removeEventListener("portfolio-theme-change", onChange);
    window.removeEventListener("storage", onStorage);
  };
};

export const useTheme = () => {
  const isDark = useSyncExternalStore(subscribeToTheme, getTheme, getServerTheme);

  useLayoutEffect(() => {
    let dark = document.documentElement.classList.contains("dark");
    try {
      dark = localStorage.getItem("portfolio-theme") === "dark";
    } catch {
      // Keep the theme already applied before hydration if storage is unavailable.
    }
    document.documentElement.classList.toggle("dark", dark);
    document.dispatchEvent(new Event("portfolio-theme-change"));
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
    } catch {
      // Theme switching still works if storage is unavailable.
    }
    document.dispatchEvent(new Event("portfolio-theme-change"));
  };

  return {isDark, toggleTheme};
};
