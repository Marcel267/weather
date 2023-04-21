import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useEffect, useState, useLayoutEffect } from "react";

export default function Toggle() {
  const [theme, setTheme] = useState<string>();

  /*
  useLayoutEffect runs synchronously after all DOM mutations, whereas useEffect runs asynchronously after the render is committed to the screen. This can result in a flicker or delay when manipulating the DOM.
  */
  useLayoutEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
      return;
    }
  }, []);

  function themeSwitch() {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
      return;
    }

    document.documentElement.classList.add("dark");
    setTheme("dark");
    localStorage.setItem("theme", "dark");
  }

  return (
    <button
      onClick={themeSwitch}
      className="absolute right-3 top-3 rounded-full bg-slate-100 px-2 py-2 text-slate-900 shadow-md hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
    >
      {theme == "dark" ? (
        <SunIcon className="h-7 w-7" />
      ) : (
        <MoonIcon className="h-7 w-7" />
      )}
    </button>
  );
}
