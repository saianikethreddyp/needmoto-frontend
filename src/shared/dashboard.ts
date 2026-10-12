import type { BookingStatus, BookingSummary } from "./bookings"
import type { CarStatus } from "./cars"

export type DashboardData = {
	timeZone: string
	revenueThisMonthMinor: number
	revenueLastMonthMinor: number
	onTheRoad: number
	publishedCars: number
	totalCars: number
	maintenanceCars: number
	utilizationPercent: number
	reservations: {
		arriving: BookingSummary[]
		leaving: BookingSummary[]
		renting: BookingSummary[]
		upcoming: BookingSummary[]
	}
	pendingApprovals: number
	expiringDocuments: {
		carId: string
		make: string
		model: string
		type: string
		expiresOn: string
	}[]
	revenueLast7Days: { date: string; amountMinor: number }[]
}

export type CalendarData = {
	cars: {
		id: string
		make: string
		model: string
		plate: string
		status: CarStatus
	}[]
	bookings: {
		id: string
		reference: string
		carId: string
		status: BookingStatus
		pickupAt: string
		returnAt: string
	}[]
	blocks: {
		id: string
		carId: string
		startsAt: string
		endsAt: string
		reason: string | null
	}[]
}
