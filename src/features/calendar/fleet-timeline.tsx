import type { BookingStatus, CarStatus } from "@rentals/shared"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const DAYS_SHOWN = 14
const DAYS_BEFORE_TODAY = 2
const DAY_MS = 86_400_000

const barColors: Record<BookingStatus, string> = {
	pending: "bg-warning/20 text-warning ring-warning/40",
	confirmed: "bg-info/20 text-info ring-info/40",
	active: "bg-success/20 text-success ring-success/40",
	completed: "bg-muted text-muted-foreground ring-border",
	cancelled: "hidden",
}

function startOfWindow() {
	const start = new Date()
	start.setHours(0, 0, 0, 0)
	return new Date(start.getTime() - DAYS_BEFORE_TODAY * DAY_MS)
}

type TripItem = {
	id: string
	reference: string
	carId: string
	status: BookingStatus
	pickupAt: string
	returnAt: string
}

type FleetCarItem = {
	id: string
	make: string
	model: string
	plate: string
	status: CarStatus
}

/** Grid columns (1-based, end exclusive) a booking covers inside the window, or null if outside. */
function getColumns(booking: TripItem, windowStart: Date) {
	const first = Math.floor((new Date(booking.pickupAt).getTime() - windowStart.getTime()) / DAY_MS)
	const last = Math.floor((new Date(booking.returnAt).getTime() - windowStart.getTime()) / DAY_MS)
	if (last < 0 || first >= DAYS_SHOWN) return null
	return { start: Math.max(first, 0) + 1, end: Math.min(last, DAYS_SHOWN - 1) + 2 }
}

type FleetTimelineProps = { cars: FleetCarItem[]; bookings: TripItem[] }

export function FleetTimeline({ cars, bookings }: FleetTimelineProps) {
	const windowStart = startOfWindow()
	const days = Array.from(
		{ length: DAYS_SHOWN },
		(_, i) => new Date(windowStart.getTime() + i * DAY_MS),
	)
	const todayIndex = DAYS_BEFORE_TODAY
	const columns = { gridTemplateColumns: `repeat(${DAYS_SHOWN}, minmax(0, 1fr))` }

	return (
		<Card className="overflow-x-auto p-0">
			<div className="min-w-[860px]">
				<div className="grid grid-cols-[11rem_1fr] border-b bg-muted/40 text-xs">
					<div className="px-4 py-3 font-medium text-muted-foreground">Car</div>
					<div className="grid" style={columns}>
						{days.map((day, index) => (
							<div
								key={day.toISOString()}
								className={cn(
									"py-2 text-center",
									index === todayIndex && "font-semibold text-primary",
								)}
							>
								<div className="text-muted-foreground">
									{day.toLocaleDateString("en-IN", { weekday: "short" })}
								</div>
								<div>{day.getDate()}</div>
							</div>
						))}
					</div>
				</div>

				{cars.map((car) => (
					<div key={car.id} className="grid grid-cols-[11rem_1fr] border-b last:border-b-0">
						<Link
							href={`/admin/cars/${car.id}`}
							className="truncate px-4 py-3 text-sm font-medium hover:text-primary"
						>
							{car.make} {car.model}
						</Link>
						<div className="relative grid items-center gap-y-1 py-2" style={columns}>
							{days.map((day, index) => (
								<div
									key={day.toISOString()}
									className={cn(
										"absolute inset-y-0 border-l",
										index === todayIndex && "bg-primary/5",
									)}
									style={{ left: `${(index / DAYS_SHOWN) * 100}%`, width: `${100 / DAYS_SHOWN}%` }}
								/>
							))}
							{bookings
								.filter((booking) => booking.carId === car.id)
								.map((booking) => {
									const span = getColumns(booking, windowStart)
									if (!span) return null
									return (
										<Link
											key={booking.id}
											href={`/admin/bookings/${booking.id}`}
											style={{ gridColumn: `${span.start} / ${span.end}`, gridRow: 1 }}
											className={cn(
												"relative z-10 mx-0.5 truncate rounded-md px-2 py-1 text-xs font-medium ring-1",
												barColors[booking.status],
											)}
										>
											{booking.reference}
										</Link>
									)
								})}
						</div>
					</div>
				))}
			</div>
		</Card>
	)
}
