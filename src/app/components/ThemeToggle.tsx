import { useEffect, useState } from "react";
import imgToggleDark from "../../asset/b828d21081c5ad67aae2a572e6dce3ea04898c87.png";
import imgToggleLight from "../../asset/529870318f67cc431611d0e617aa497ef6656ccd.png";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Vérifier le thème au chargement
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-[60px] h-[30px] relative"
      aria-label={isDark ? "Mode clair" : "Mode sombre"}
    >
      <img 
        src={isDark ? imgToggleDark : imgToggleLight} 
        alt={isDark ? "Mode sombre actif" : "Mode clair actif"}
        className="w-full h-full object-contain invert"
      />
    </button>
  );
}