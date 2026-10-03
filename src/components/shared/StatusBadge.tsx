import { cn } from '@/lib/utils'

type MasteryStatus = 'new' | 'learning' | 'review' | 'mastered'

interface StatusBadgeProps {
  status: MasteryStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    new: {
      label: 'New',
      className: 'bg-gray-100 text-gray-700 border-gray-300',
    },
    learning: {
      label: 'Learning',
      className: 'bg-blue-100 text-blue-700 border-blue-300',
    },
    review: {
      label: 'Review',
      className: 'bg-orange-100 text-orange-700 border-orange-300',
    },
    mastered: {
      label: 'Mastered',
      className: 'bg-green-100 text-green-700 border-green-300',
    },
  }

  const config = statusConfig[status]

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
