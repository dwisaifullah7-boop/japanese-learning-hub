import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  icon?: React.ReactNode
  className?: string
}

export function PageHeader({ title, description, icon, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-6 sm:mb-8', className)}>
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        {icon && <div className="text-2xl sm:text-3xl">{icon}</div>}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
      </div>
      {description && (
        <p className="text-base sm:text-lg text-gray-600">{description}</p>
      )}
    </div>
  )
}
