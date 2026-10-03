import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/components/providers/ToastProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { AudioProvider } from '@/components/providers/AudioProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Japanese Learning Hub',
  description: 'Belajar bahasa Jepang secara terstruktur',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthProvider>
          <AudioProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </AudioProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
