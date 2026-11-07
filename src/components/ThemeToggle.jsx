import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:text-white"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};
export default ThemeToggle;