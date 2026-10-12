import type { Car } from "@rentals/shared"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatMoney } from "@/lib/format"
import { capitalize, formatPlate } from "./car-labels"

export function CarSpecList({ car }: { car: Car & { location?: string } }) {
	const locationText = car.homeLocationName ?? car.location ?? "Unassigned"
	const groups = [
		{
			title: "Vehicle",
			rows: [
				["Plate", formatPlate(car.plate)],
				["Year", String(car.year)],
				["Category", capitalize(car.category)],
				["Colour", car.color ?? "Not specified"],
				["Odometer", `${car.mileageKm.toLocaleString("en-IN")} km`],
			],
		},
		{
			title: "Drivetrain",
			rows: [
				["Seats", String(car.seats)],
				["Transmission", capitalize(car.transmission)],
				["Fuel", capitalize(car.fuel)],
			],
		},
		{
			title: "Pricing",
			rows: [
				["Per day", formatMoney(car.dailyPriceMinor)],
				["Deposit", formatMoney(car.depositMinor)],
				["Home location", locationText],
			],
		},
	]

	return (
		<div className="grid gap-6 md:grid-cols-3">
			{groups.map((group) => (
				<Card key={group.title}>
					<CardHeader>
						<CardTitle>{group.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<dl className="space-y-2.5 text-sm">
							{group.rows.map(([label, value]) => (
								<div key={label} className="flex justify-between gap-4">
									<dt className="text-muted-foreground">{label}</dt>
									<dd className="text-right font-medium">{value}</dd>
								</div>
							))}
						</dl>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
