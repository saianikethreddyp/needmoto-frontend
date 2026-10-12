import type { BookingDetail } from "@rentals/shared"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDateTime, formatMoney } from "@/lib/format"

type Row = [label: string, value: string]

function DetailCard({ title, rows }: { title: string; rows: Row[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<dl className="space-y-2.5 text-sm">
					{rows.map(([label, value]) => (
						<div key={label} className="flex justify-between gap-4">
							<dt className="text-muted-foreground">{label}</dt>
							<dd className="text-right font-medium">{value}</dd>
						</div>
					))}
				</dl>
			</CardContent>
		</Card>
	)
}

export function BookingSummaryCards({ booking }: { booking: BookingDetail }) {
	return (
		<div className="grid gap-6 md:grid-cols-2">
			<DetailCard
				title="Trip"
				rows={[
					["Car", `${booking.car.make} ${booking.car.model} (${booking.car.plate})`],
					["Pickup", formatDateTime(booking.pickupAt)],
					["Return", formatDateTime(booking.returnAt)],
					["Pickup Location", booking.pickupLocationName],
					["Return Location", booking.returnLocationName || booking.pickupLocationName],
					["Duration", `${booking.days} days`],
				]}
			/>
			<DetailCard
				title="Customer"
				rows={[
					["Name", booking.customer.name],
					["Email", booking.customerDetails?.email ?? "—"],
					["Phone", booking.customerDetails?.phone ?? "—"],
					["Licence", booking.customerDetails?.licenseNumber ?? "—"],
				]}
			/>
			<DetailCard
				title="Price Breakdown"
				rows={[
					["Rental", formatMoney(booking.rentalMinor)],
					["Extras", formatMoney(booking.extrasMinor)],
					[`Tax (${booking.taxPercent}%)`, formatMoney(booking.taxMinor)],
					["Security Deposit", formatMoney(booking.depositMinor)],
					["Total", formatMoney(booking.totalMinor)],
				]}
			/>
			{booking.extras.length > 0 && (
				<DetailCard
					title="Extras Attached"
					rows={booking.extras.map((ex) => [
						`${ex.name} (x${ex.quantity})`,
						formatMoney(ex.totalMinor),
					])}
				/>
			)}
		</div>
	)
}
