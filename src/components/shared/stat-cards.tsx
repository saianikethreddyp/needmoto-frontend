import { Card } from "@/components/ui/card"

type Stat = { label: string; value: string; hint?: string }

export function StatCards({ stats }: { stats: Stat[] }) {
	return (
		<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
			{stats.map((stat) => (
				<Card key={stat.label} className="gap-1 px-5 py-5">
					<p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
					<p className="text-3xl font-bold tracking-tight tabular-nums">{stat.value}</p>
					{stat.hint && <p className="text-xs text-muted-foreground">{stat.hint}</p>}
				</Card>
			))}
		</div>
	)
}
