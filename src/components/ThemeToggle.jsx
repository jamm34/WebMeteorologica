import { useEffect, useState } from "react";
import { WiDaySunny, WiMoonWaningCrescent4 } from "react-icons/wi";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // Cargar preferencia inicial
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;

    const shouldBeDark = saved ? saved === "dark" : !!prefersDark;
    setDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-2 shadow-sm
                 bg-white text-gray-800 hover:bg-gray-50
                 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
      aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      type="button"
    >
      {dark ? (
        <>
          <WiDaySunny size={26} className="text-yellow-400" />
          <span className="text-sm font-semibold">Claro</span>
        </>
      ) : (
        <>
          <WiMoonWaningCrescent4 size={26} className="text-indigo-300" />
          <span className="text-sm font-semibold">Oscuro</span>
        </>
      )}
    </button>
  );
}
