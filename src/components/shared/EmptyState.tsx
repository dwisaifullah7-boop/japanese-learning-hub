'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  actionHref?: string  // Tambahkan ini
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-8 sm:py-12 px-4 text-center',
        className
      )}
    >
      {icon && <div className="text-5xl sm:text-6xl mb-4">{icon}</div>}
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md">{description}</p>
      )}
      {actionLabel && (
        actionHref ? (
          <Link href={actionHref}>
            <Button size="lg">{actionLabel}</Button>
          </Link>
        ) : onAction ? (
          <Button onClick={onAction} size="lg">
            {actionLabel}
          </Button>
        ) : null
      )}
    </div>
  )
}
