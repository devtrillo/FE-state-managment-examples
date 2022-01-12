import PropTypes from "prop-types";
import { FC, useEffect, useState } from "react";
import { AiFillWindows, AiOutlineConsoleSql } from "react-icons/ai";

type Props = {
  strategy: string;
  name: string;
};

export const Header: FC<Props> = ({ strategy = "NO Strategy", name }) => {
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
      <h1>Strategy: {strategy}</h1>
      <h1>Name: {name}</h1>
      <button
        onClick={cycleTheme}
        className="bg-blue-500 p-2 rounded-md dark:bg-blue-900"
      >
        Switch Theme
      </button>
    </header>
  );
};

Header.propTypes = {
  strategy: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
