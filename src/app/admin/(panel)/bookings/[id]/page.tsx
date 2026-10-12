import type { BookingDetail } from "@rentals/shared"
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/layout/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { BookingActions } from "@/features/bookings/booking-actions"
import { BookingSummaryCards } from "@/features/bookings/booking-summary-cards"
import { BookingTimeline } from "@/features/bookings/booking-timeline"
import { serverApiRequest } from "@/lib/server-api"

export default async function BookingDetailPage({ params }: PageProps<"/admin/bookings/[id]">) {
	const { id } = await params
	let booking: BookingDetail
	try {
		booking = await serverApiRequest<BookingDetail>(`/v1/admin/bookings/${id}`)
	} catch {
		notFound()
	}

	return (
		<>
			<PageHeader
				title={booking.reference}
				description={`${booking.customer.name} · ${booking.car.make} ${booking.car.model}`}
				action={<BookingActions bookingId={booking.id} status={booking.status} />}
			/>
			<div className="mb-6 flex gap-2">
				<StatusBadge status={booking.status} />
				<StatusBadge status={booking.paymentStatus} />
			</div>
			<div className="grid gap-6 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<BookingSummaryCards booking={booking} />
				</div>
				<BookingTimeline booking={booking} />
			</div>
		</>
	)
}
