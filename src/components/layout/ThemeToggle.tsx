'use client'

import { useState, useRef, useEffect } from 'react'
import { useTheme, ThemeType } from '@/components/providers/ThemeProvider'
import { Sun, Moon, Sparkles, Trees, Palette } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme, isDark, toggleDark } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const themes: { id: ThemeType; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'default', label: 'Light', icon: <Sun className="w-3.5 h-3.5 text-amber-500" />, color: 'hover:bg-amber-50' },
    { id: 'dark', label: 'Dark', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" />, color: 'hover:bg-indigo-50 dark:hover:bg-indigo-950/40' },
    { id: 'sakura', label: 'Sakura', icon: <Sparkles className="w-3.5 h-3.5 text-pink-500" />, color: 'hover:bg-pink-50 dark:hover:bg-pink-950/40' },
    { id: 'forest', label: 'Forest', icon: <Trees className="w-3.5 h-3.5 text-emerald-500" />, color: 'hover:bg-emerald-50 dark:hover:bg-emerald-950/40' },
  ]

  const currentIcon = isDark ? (
    <Moon className="w-4 h-4 text-indigo-400" />
  ) : theme === 'sakura' ? (
    <Sparkles className="w-4 h-4 text-pink-500" />
  ) : theme === 'forest' ? (
    <Trees className="w-4 h-4 text-emerald-600" />
  ) : (
    <Sun className="w-4 h-4 text-amber-500" />
  )

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        title="Ganti Tema & Dark Mode"
        className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-700 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-xs transition-all"
        aria-label="Pilih Tema Tampilan"
      >
        {currentIcon}
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-36 py-1.5 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-1">
            <Palette className="w-3 h-3" />
            Tema Tampilan
          </div>
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id)
                setMenuOpen(false)
              }}
              className={`w-full px-3 py-1.5 text-left text-xs font-medium flex items-center gap-2 transition-colors ${
                theme === t.id
                  ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold'
                  : 'text-gray-700 dark:text-gray-200 ' + t.color
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
              {theme === t.id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
