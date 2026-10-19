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
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'p-5 sm:p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs transition-all hover:border-zinc-300 dark:hover:border-zinc-700',
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{label}</span>
        {icon && (
          <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            {icon}
          </div>
        )}
      </div>
      <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">{value}</p>
    </div>
  )
}
