import type { BookingDetail, BookingSummary } from "@rentals/shared"
import { apiRequest } from "@/lib/api-client"

const basePath = "/v1/admin/bookings"

export const listBookings = (params?: {
	status?: string
	carId?: string
	customerId?: string
	q?: string
}) => {
	const search = new URLSearchParams()
	if (params?.status) search.set("status", params.status)
	if (params?.carId) search.set("carId", params.carId)
	if (params?.customerId) search.set("customerId", params.customerId)
	if (params?.q) search.set("q", params.q)
	const query = search.toString()
	return apiRequest<{ items: BookingSummary[]; total: number }>(
		query ? `${basePath}?${query}` : basePath,
	)
}

export const getBookingDetail = (id: string) => apiRequest<BookingDetail>(`${basePath}/${id}`)

export const confirmBooking = (id: string) =>
	apiRequest<BookingDetail>(`${basePath}/${id}/confirm`, { method: "POST" })

export const pickupBooking = (id: string, odometerKm = 0) =>
	apiRequest<BookingDetail>(`${basePath}/${id}/pickup`, { method: "POST", body: { odometerKm } })

export const returnBooking = (id: string, odometerKm = 0) =>
	apiRequest<BookingDetail>(`${basePath}/${id}/return`, { method: "POST", body: { odometerKm } })

export const cancelBooking = (id: string, reason = "Admin cancelled") =>
	apiRequest<BookingDetail>(`${basePath}/${id}/cancel`, { method: "POST", body: { reason } })
