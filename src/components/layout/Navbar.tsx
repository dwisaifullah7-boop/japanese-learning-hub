'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'
import {
  Menu,
  X,
  Home,
  BookOpen,
  PenTool,
  FileText,
  Search,
  MoreHorizontal,
  Target,
  AlertCircle,
  BarChart3,
  LayoutDashboard,
  LogOut,
  User,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'

const PRIMARY_MENU = [
  { href: '/home',     label: 'Home',     icon: Home },
  { href: '/learn',    label: 'Belajar',  icon: BookOpen },
  { href: '/practice', label: 'Latihan',  icon: PenTool },
  { href: '/exam',     label: 'Ujian',    icon: FileText },
]

const SECONDARY_MENU = [
  { href: '/search',   label: 'Pencarian & Kamus', icon: Search, desc: 'Cari kosakata, kanji, & pola kalimat' },
  { href: '/mastery',  label: 'Status Mastery',     icon: Target, desc: 'Tingkat penguasaan materi' },
  { href: '/review',   label: 'Review Lemah',       icon: AlertCircle, desc: 'Perkuat materi akurasi rendah' },
  { href: '/progress', label: 'Progres & XP',       icon: BarChart3, desc: 'Statistik belajar & pencapaian' },
  { href: '/dashboard',label: 'Dashboard Belajar',  icon: LayoutDashboard, desc: 'Ringkasan aktivitas pengguna' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { data: session } = useSession()
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 sticky top-0 z-50 transition-colors" suppressHydrationWarning>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo Minimalis */}
          <Link href="/home" className="flex items-center gap-2.5 flex-shrink-0 group">
            <span className="text-xl">🎌</span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Japanese Learning Hub
            </span>
          </Link>

          {/* Desktop Primary Menu (4 Bersih) */}
          <div className="hidden md:flex items-center gap-1" suppressHydrationWarning>
            {PRIMARY_MENU.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Menu Lainnya Dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
                aria-expanded={moreOpen}
              >
                <span>Lainnya</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreOpen && (
                <div className="absolute left-0 mt-2 w-64 p-2 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200/80 dark:border-zinc-800 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-0.5">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Fitur & Statistik
                  </div>
                  {SECONDARY_MENU.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className="flex items-start gap-3 p-2.5 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <item.icon className="w-4 h-4 mt-0.5 text-zinc-500 dark:text-zinc-400" />
                      <div>
                        <div className="font-semibold text-zinc-900 dark:text-zinc-100">{item.label}</div>
                        <div className="text-[11px] text-zinc-400 dark:text-zinc-500">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Action Icons: Theme Toggle + User Menu (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {!isMounted ? (
              <div className="h-8 w-20 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-xl" />
            ) : session?.user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                  <User className="w-3.5 h-3.5" />
                  <span className="max-w-[120px] truncate">{session.user.name || session.user.email}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="text-xs text-zinc-500 hover:text-red-600 dark:hover:text-red-400 h-8 px-2.5 rounded-xl"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-xs h-8 px-3 rounded-xl">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="default" size="sm" className="text-xs h-8 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Right Controls: Theme Toggle + Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="min-w-[40px] min-h-[40px] rounded-xl text-zinc-700 dark:text-zinc-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 max-h-[calc(100vh-64px)] overflow-y-auto p-4 space-y-4">
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Menu Utama
            </div>
            {PRIMARY_MENU.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-4 h-4 text-zinc-500" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="space-y-1 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Fitur Lanjutan
            </div>
            {SECONDARY_MENU.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-4 h-4 text-zinc-400" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          
          {/* Mobile User Menu */}
          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3">
            {!isMounted ? (
              <div className="h-9 w-full bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded-xl" />
            ) : session?.user ? (
              <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  <User className="w-4 h-4 text-zinc-400" />
                  <span className="truncate max-w-[180px]">{session.user.name || session.user.email}</span>
                </div>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/login' })
                    setIsOpen(false)
                  }}
                  className="text-xs text-red-600 font-semibold px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  className="text-center py-2 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-center py-2 text-xs font-semibold rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
