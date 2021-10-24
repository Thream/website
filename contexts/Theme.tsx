import { createContext, useState, useEffect, useContext } from 'react'

export const themes = ['light', 'dark'] as const
export type Theme = typeof themes[number]

export interface ThemeValue {
  theme: Theme
  handleToggleTheme: () => void
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

const defaultThemeContext: ThemeValue = {} as any
const ThemeContext = createContext<ThemeValue>(defaultThemeContext)

const getOppositeTheme = (theme: Theme): Theme => {
  return theme === 'dark' ? 'light' : 'dark'
}

export const ThemeProvider: React.FC = (props) => {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const localTheme = localStorage.getItem('theme') as Theme
    if (themes.includes(localTheme)) {
      setTheme(localTheme)
    }
  }, [])

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement
    const oppositeTheme = getOppositeTheme(theme)
    body.classList.add(`theme-${theme}`)
    body.classList.remove(`theme-${oppositeTheme}`)
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleToggleTheme = (): void => {
    const oppositeTheme = getOppositeTheme(theme)
    setTheme(oppositeTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, handleToggleTheme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeValue => {
  return useContext(ThemeContext)
}
