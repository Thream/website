import { createContext, useState, useEffect } from 'react'

export type Theme = 'dark' | 'light'

export interface ThemeValue {
  theme: Theme
  handleToggleTheme: () => void
}

export const ThemeContext = createContext<ThemeValue>({
  theme: 'dark',
  handleToggleTheme: () => {}
})

const getOppositeTheme = (theme: Theme): Theme => {
  return theme === 'dark' ? 'light' : 'dark'
}

export const ThemeProvider: React.FC = (props) => {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement
    const oppositeTheme = getOppositeTheme(theme)
    body.classList.add(`theme-${theme}`)
    body.classList.remove(`theme-${oppositeTheme}`)
  }, [theme])

  const handleToggleTheme = (): void => {
    const oppositeTheme = getOppositeTheme(theme)
    setTheme(oppositeTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, handleToggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}
