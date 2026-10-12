import type { BookingSummary } from "@rentals/shared"
import { PageHeader } from "@/components/layout/page-header"
import { BookingsBrowser } from "@/features/bookings/bookings-browser"
import { serverApiRequest } from "@/lib/server-api"

export default async function BookingsPage() {
	let bookings: BookingSummary[] = []
	try {
		const res = await serverApiRequest<{ items: BookingSummary[]; total: number }>(
			"/v1/admin/bookings",
		)
		bookings = res.items
	} catch {
		bookings = []
	}

	return (
		<>
			<PageHeader title="Bookings" description="Approve, track and close out rentals." />
			<BookingsBrowser bookings={bookings} />
		</>
	)
}
