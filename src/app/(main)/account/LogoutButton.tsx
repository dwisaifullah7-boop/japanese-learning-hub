'use client'

import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  return (
    <Button 
      variant="destructive" 
      className="w-full flex items-center justify-center gap-2"
      onClick={() => signOut({ callbackUrl: '/login' })}
    >
      <LogOut className="w-4 h-4" />
      Keluar (Logout)
    </Button>
  )
}
