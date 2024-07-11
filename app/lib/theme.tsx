import { createContext, useContext, useEffect, useState } from 'react'

interface UseThemeProps {
  toggleTheme: () => void
}

interface ThemeProviderProps {
  children?: any
}

export const ThemeContext = createContext<UseThemeProps>({
  toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const key = localStorage.getItem('darkMode')
    setIsDarkMode(key === 'true')
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <ThemeContext.Provider
      value={{
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
