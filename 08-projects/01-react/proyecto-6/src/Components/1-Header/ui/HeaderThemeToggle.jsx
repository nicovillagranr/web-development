import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../../hooks/useTheme"

export const HeaderThemeToggle = () => {
    const { isDark, toggleTheme } = useTheme()
    return (
        <button type="button" onClick={toggleTheme} aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"} aria-pressed={isDark} className="text-ink dark:text-paper hover:text-camel transition-colors duration-200">
            {isDark ? (<FiSun />) : (<FiMoon />)}
        </button>
    )
}
