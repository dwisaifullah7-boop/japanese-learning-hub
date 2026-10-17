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
        'group relative overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-xs hover-float hover:border-blue-400 dark:hover:border-blue-500 transition-all',
        onClick && 'cursor-pointer active:scale-[0.98]',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 sm:gap-3.5 flex-1 min-w-0">
          {icon && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 group-hover:scale-110 transition-transform duration-300 shrink-0">
              {icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{subtitle}</p>
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
            className="ml-2 flex-shrink-0 min-w-[40px] min-h-[40px] rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800"
          >
            <Volume2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </Button>
        )}
      </div>

      {description && (
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {description}
        </p>
      )}

      {children}
    </div>
  )
}
