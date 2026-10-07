import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth
  const pathname = req.nextUrl.pathname

  // Daftar halaman yang TIDAK perlu login (Public)
  const isPublicPath = 
    pathname === '/' || 
    pathname === '/login' || 
    pathname === '/register' ||
    pathname.startsWith('/api/auth')

  // Jika user belum login dan mencoba akses halaman private, redirect ke /login
  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Jika user sudah login dan mencoba akses /login atau /register, redirect ke /home
  if (isLoggedIn && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/home', req.url))
  }
})

export default proxy

// Konfigurasi matcher: Jalankan middleware untuk semua route kecuali file statis dan API internal Next.js
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
