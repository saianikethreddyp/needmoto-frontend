import type { BookingSummary } from "@rentals/shared"
import { CalendarCheck } from "lucide-react"
import Link from "next/link"
import { EmptyState } from "@/components/shared/empty-state"
import { StatusBadge } from "@/components/shared/status-badge"
import { Card } from "@/components/ui/card"
import { formatDateTime, formatMoney } from "@/lib/format"

/** Compact booking rows, used on a car's detail page. */
export function BookingsList({ bookings }: { bookings: BookingSummary[] }) {
	if (bookings.length === 0) {
		return (
			<EmptyState
				icon={CalendarCheck}
				title="No bookings yet"
				description="Bookings for this car will show up here."
			/>
		)
	}

	return (
		<Card className="gap-0 divide-y p-0">
			{bookings.map((booking) => (
				<Link
					key={booking.id}
					href={`/admin/bookings/${booking.id}`}
					className="flex items-center gap-4 px-4 py-3 hover:bg-muted/50"
				>
					<div className="min-w-0 flex-1">
						<p className="text-sm font-medium">{booking.customer.name}</p>
						<p className="text-xs text-muted-foreground">
							{formatDateTime(booking.pickupAt)} → {formatDateTime(booking.returnAt)}
						</p>
					</div>
					<span className="hidden text-sm font-medium sm:block">
						{formatMoney(booking.totalMinor)}
					</span>
					<StatusBadge status={booking.status} />
				</Link>
			))}
		</Card>
	)
}
