import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatMoney } from "@/lib/format"

type RevenueDay = { label: string; amountMinor: number }

export function RevenueBars({ days }: { days: RevenueDay[] }) {
	const peak = Math.max(...days.map((day) => day.amountMinor), 1)
	const total = days.reduce((sum, day) => sum + day.amountMinor, 0)

	return (
		<Card>
			<CardHeader>
				<CardTitle>Revenue, last 7 days</CardTitle>
				<CardDescription>{formatMoney(total)} collected</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex h-44 items-stretch gap-3">
					{days.map((day) => (
						<div key={day.label} className="flex flex-1 flex-col items-center gap-2">
							<div className="flex min-h-0 w-full flex-1 items-end">
								<div
									className="w-full rounded-lg bg-foreground/85 hover:bg-primary"
									style={{ height: `${(day.amountMinor / peak) * 100}%` }}
									title={formatMoney(day.amountMinor)}
								/>
							</div>
							<span className="text-xs text-muted-foreground">{day.label}</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
