'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type ThemeType = 'default' | 'sakura' | 'forest' | 'dark'

interface ThemeContextType {
  theme: ThemeType
  isDark: boolean
  setTheme: (theme: ThemeType) => void
  toggleDark: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'default',
  isDark: false,
  setTheme: () => {},
  toggleDark: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>('default')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage
    const savedTheme = (localStorage.getItem('jh_theme') as ThemeType) || 'default'
    setThemeState(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (t: ThemeType) => {
    const root = document.documentElement
    // Remove old classes and attributes
    root.classList.remove('dark')
    root.removeAttribute('data-theme')

    if (t === 'dark') {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
    } else if (t === 'sakura') {
      root.setAttribute('data-theme', 'sakura')
    } else if (t === 'forest') {
      root.setAttribute('data-theme', 'forest')
    } else {
      root.setAttribute('data-theme', 'default')
    }
  }

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme)
    localStorage.setItem('jh_theme', newTheme)
    applyTheme(newTheme)

    // Also sync to jh_user_settings if present
    try {
      const storedSettings = localStorage.getItem('jh_user_settings')
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings)
        parsed.theme = newTheme
        localStorage.setItem('jh_user_settings', JSON.stringify(parsed))
      }
    } catch (e) {
      // ignore
    }
  }

  const toggleDark = () => {
    if (theme === 'dark') {
      setTheme('default')
    } else {
      setTheme('dark')
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', setTheme, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
