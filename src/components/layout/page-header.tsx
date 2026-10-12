import type { ReactNode } from "react"

type PageHeaderProps = { title: string; description?: string; action?: ReactNode }

export function PageHeader({ title, description, action }: PageHeaderProps) {
	return (
		<div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-start sm:justify-between">
			<div>
				<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
				{description && <p className="mt-2 text-base text-muted-foreground">{description}</p>}
			</div>
			{action && <div className="flex shrink-0 gap-2">{action}</div>}
		</div>
	)
}
