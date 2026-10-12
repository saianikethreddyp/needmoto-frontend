import type { BookingSummary, DashboardData } from "@rentals/shared"
import { formatDateTime } from "@/lib/format"
import type { ReservationGroups, ReservationRow } from "./reservations-panel"

function toRow(booking: BookingSummary, whenIso: string): ReservationRow {
	return {
		id: booking.id,
		customer: booking.customer?.name ?? "Guest",
		car: booking.car ? `${booking.car.make} ${booking.car.model}` : "Car",
		location: booking.pickupLocationName ?? "Unassigned",
		when: formatDateTime(whenIso),
		status: booking.status,
	}
}

export function buildReservationGroups(
	reservations?: DashboardData["reservations"],
): ReservationGroups {
	if (!reservations) {
		return { arriving: [], leaving: [], renting: [], upcoming: [] }
	}
	return {
		arriving: (reservations.arriving ?? []).map((b) => toRow(b, b.pickupAt)),
		leaving: (reservations.leaving ?? []).map((b) => toRow(b, b.returnAt)),
		renting: (reservations.renting ?? []).map((b) => toRow(b, b.returnAt)),
		upcoming: (reservations.upcoming ?? []).map((b) => toRow(b, b.pickupAt)),
	}
}
