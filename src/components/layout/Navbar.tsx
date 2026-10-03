'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, Home, BookOpen, PenTool, Target, FileText, Search, BarChart3, LayoutDashboard, LogOut, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession() // Ambil data session

  const mainMenu = [
    { href: '/home', label: 'Home', icon: Home },
    { href: '/learn', label: 'Learn', icon: BookOpen },
    { href: '/practice', label: 'Practice', icon: PenTool },
    { href: '/mastery', label: 'Mastery', icon: Target },
    { href: '/exam', label: 'Exam', icon: FileText },
    { href: '/search', label: 'Search', icon: Search },
    { href: '/progress', label: 'Progress', icon: BarChart3 },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-2xl">🎌</span>
            <span className="text-lg sm:text-xl font-bold text-gray-900">Japanese Learning Hub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu (Desktop) - DINAMIS */}
          <div className="hidden lg:flex items-center space-x-2">
            {session?.user ? (
              <>
                <div className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700">
                  <User className="w-4 h-4" />
                  <span>{session.user.name || session.user.email}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => signOut({ callbackUrl: '/login' })}
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="default" size="sm">Register</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden min-w-[44px] min-h-[44px]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {mainMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 min-h-[44px]"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
            
            {/* Mobile User Menu - DINAMIS */}
            <div className="border-t border-gray-200 pt-2 mt-2 space-y-1">
              {session?.user ? (
                <>
                  <div className="flex items-center space-x-2 px-3 py-3 text-base font-medium text-gray-700">
                    <User className="w-5 h-5" />
                    <span>{session.user.name || session.user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: '/login' })
                      setIsOpen(false)
                    }}
                    className="flex items-center space-x-2 px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50 w-full text-left min-h-[44px]"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center space-x-2 px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 min-h-[44px]"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center space-x-2 px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 min-h-[44px]"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
