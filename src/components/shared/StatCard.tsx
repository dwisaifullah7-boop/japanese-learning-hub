import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  color?: 'blue' | 'green' | 'orange' | 'red' | 'purple'
  className?: string
}

export function StatCard({
  label,
  value,
  icon,
  color = 'blue',
  className,
}: StatCardProps) {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    orange: 'text-orange-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
  }

  return (
    <div
      className={cn(
        'bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200',
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm font-medium text-gray-600">{label}</span>
        {icon && <div className="text-xl sm:text-2xl">{icon}</div>}
      </div>
      <p className={cn('text-2xl sm:text-3xl font-bold', colorClasses[color])}>{value}</p>
    </div>
  )
}
