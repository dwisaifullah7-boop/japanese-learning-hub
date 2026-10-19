'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Volume2 } from 'lucide-react'

interface MaterialCardProps {
  title: string
  subtitle?: string
  description?: string
  icon?: React.ReactNode
  onClick?: () => void
  onAudioClick?: () => void
  className?: string
  children?: React.ReactNode
}

export function MaterialCard({
  title,
  subtitle,
  description,
  icon,
  onClick,
  onAudioClick,
  className,
  children,
}: MaterialCardProps) {
  return (
    <div
      className={cn(
        'group p-5 sm:p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-all',
        onClick && 'cursor-pointer active:scale-[0.99]',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {icon && (
            <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:scale-105 transition-transform shrink-0">
              {icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        {onAudioClick && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onAudioClick()
            }}
            className="ml-2 flex-shrink-0 min-w-[36px] min-h-[36px] rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Volume2 className="w-4 h-4 text-zinc-400" />
          </Button>
        )}
      </div>

      {description && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed mt-2">
          {description}
        </p>
      )}

      {children}
    </div>
  )
}
