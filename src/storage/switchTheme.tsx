import { useEffect, useState } from "react" 

const SwitchTheme = () => {
    const storedTheme = localStorage.getItem("color-theme") 
    const [isDarkMode, setIsDarkMode] = useState(storedTheme === "dark") 

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark") 
        } else {
            document.documentElement.classList.remove("dark") 
        }
        localStorage.setItem("color-theme", isDarkMode ? "dark" : "light") 
    }, [isDarkMode]) 

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode) 
    } 

    return { isDarkMode, toggleDarkMode } 
} 

export default SwitchTheme 