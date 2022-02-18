import { FC, useEffect, useState } from "react";

export const Header: FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const onFocus = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  };
  const cycleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
    onFocus();
  };

  useEffect(() => {
    window.onfocus = onFocus;

    return () => {
      window.onfocus = () => {};
    };
  });

  return (
    <header className="text-3xl font-bold bg-blue-300 dark:bg-blue-500 dark:text-white p-3 flex sm:justify-between capitalize flex-wrap justify-center items-center gap-7">
      <h1>React State management comparisons</h1>

      <button
        className="bg-blue-500 p-2 rounded-md dark:bg-blue-900"
        onClick={cycleTheme}
      >
        Switch Theme
      </button>
    </header>
  );
};
