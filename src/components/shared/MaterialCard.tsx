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
        'bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow',
        onClick && 'cursor-pointer active:scale-[0.98]',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {icon && <div className="text-xl sm:text-2xl flex-shrink-0">{icon}</div>}
          <div className="min-w-0 flex-1">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">{title}</h3>
            {subtitle && (
              <p className="text-xs sm:text-sm text-gray-500 truncate">{subtitle}</p>
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
            className="ml-2 flex-shrink-0 min-w-[44px] min-h-[44px]"
          >
            <Volume2 className="w-4 h-4" />
          </Button>
        )}
      </div>
      {description && (
        <p className="text-sm sm:text-base text-gray-600 mb-3">{description}</p>
      )}
      {children}
    </div>
  )
}
