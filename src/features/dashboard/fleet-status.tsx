import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function FleetStatus({
	onTheRoad = 0,
	publishedCars = 0,
	maintenanceCars = 0,
	utilizationPercent = 0,
}: {
	onTheRoad?: number
	publishedCars?: number
	maintenanceCars?: number
	utilizationPercent?: number
}) {
	const rows = [
		{ label: "On the road", value: onTheRoad },
		{ label: "Available", value: Math.max(0, publishedCars - onTheRoad) },
		{ label: "In maintenance", value: maintenanceCars },
	]
	const utilization = utilizationPercent

	return (
		<Card>
			<CardHeader>
				<CardTitle>Fleet right now</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div>
					<div className="mb-2 flex justify-between text-sm">
						<span className="text-muted-foreground">Utilization</span>
						<span className="font-medium">{utilization}%</span>
					</div>
					<Progress value={utilization} />
				</div>
				<ul className="space-y-2 text-sm">
					{rows.map((row) => (
						<li key={row.label} className="flex justify-between">
							<span className="text-muted-foreground">{row.label}</span>
							<span className="font-medium tabular-nums">{row.value}</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}
