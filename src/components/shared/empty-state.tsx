import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"

type EmptyStateProps = { icon: LucideIcon; title: string; description: string; action?: ReactNode }

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
	return (
		<Card className="items-center gap-2 px-6 py-14 text-center">
			<span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
				<Icon className="size-5" />
			</span>
			<p className="font-medium">{title}</p>
			<p className="max-w-sm text-sm text-muted-foreground">{description}</p>
			{action && <div className="mt-2">{action}</div>}
		</Card>
	)
}
