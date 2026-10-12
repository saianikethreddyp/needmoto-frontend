import type { CalendarData } from "@rentals/shared"
import { PageHeader } from "@/components/layout/page-header"
import { FleetTimeline } from "@/features/calendar/fleet-timeline"
import { serverApiRequest } from "@/lib/server-api"

export default async function CalendarPage() {
	const now = new Date()
	const from = new Date(now.getTime() - 2 * 86_400_000).toISOString()
	const to = new Date(now.getTime() + 14 * 86_400_000).toISOString()

	let data: CalendarData = { cars: [], bookings: [], blocks: [] }
	try {
		data = await serverApiRequest<CalendarData>(`/v1/admin/calendar?from=${from}&to=${to}`)
	} catch {
		// Empty if unreachable
	}

	return (
		<>
			<PageHeader title="Calendar" description="Who has which car over the next two weeks." />
			<FleetTimeline cars={data.cars} bookings={data.bookings} />
		</>
	)
}
