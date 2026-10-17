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
  const colorSchemes = {
    blue: {
      text: 'text-blue-600 dark:text-blue-400',
      bgIcon: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400',
      border: 'border-blue-100/80 dark:border-blue-900/40',
      glow: 'from-blue-500/5 to-indigo-500/5',
    },
    green: {
      text: 'text-emerald-600 dark:text-emerald-400',
      bgIcon: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-100/80 dark:border-emerald-900/40',
      glow: 'from-emerald-500/5 to-teal-500/5',
    },
    orange: {
      text: 'text-amber-600 dark:text-amber-400',
      bgIcon: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
      border: 'border-amber-100/80 dark:border-amber-900/40',
      glow: 'from-amber-500/5 to-orange-500/5',
    },
    red: {
      text: 'text-rose-600 dark:text-rose-400',
      bgIcon: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400',
      border: 'border-rose-100/80 dark:border-rose-900/40',
      glow: 'from-rose-500/5 to-pink-500/5',
    },
    purple: {
      text: 'text-purple-600 dark:text-purple-400',
      bgIcon: 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400',
      border: 'border-purple-100/80 dark:border-purple-900/40',
      glow: 'from-purple-500/5 to-violet-500/5',
    },
  }

  const scheme = colorSchemes[color]

  return (
    <div
      className={cn(
        'relative overflow-hidden p-5 sm:p-6 rounded-2xl border bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xs hover-float transition-all',
        scheme.border,
        className
      )}
    >
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br ${scheme.glow} blur-xl pointer-events-none`} />

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400">{label}</span>
        {icon && (
          <div className={cn('p-2.5 rounded-xl flex items-center justify-center transition-transform hover:scale-110', scheme.bgIcon)}>
            {icon}
          </div>
        )}
      </div>
      <p className={cn('text-2xl sm:text-3xl font-extrabold tracking-tight', scheme.text)}>{value}</p>
    </div>
  )
}
