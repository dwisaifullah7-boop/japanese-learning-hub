'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center max-w-md">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Terjadi Kesalahan
        </h2>
        <p className="text-gray-600 mb-6">
          Maaf, terjadi kesalahan saat memuat halaman ini. Silakan coba lagi.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset} variant="default">
            Coba Lagi
          </Button>
          <Link href="/home">
            <Button variant="outline">
              Kembali ke Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
