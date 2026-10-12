import { z } from "zod"
import { createCustomerSchema } from "./customers"

export const bookingStatuses = ["pending", "confirmed", "active", "completed", "cancelled"] as const
export const paymentStatuses = ["unpaid", "deposit_paid", "paid", "refunded"] as const
/** Statuses that hold a car; the database blocks overlaps between these. */
export const liveBookingStatuses = ["pending", "confirmed", "active"] as const

const instant = z.string().datetime()
const extraSelection = z.object({
	extraId: z.string().uuid(),
	quantity: z.number().int().min(1).max(10),
})

const tripFields = {
	carId: z.string().uuid(),
	pickupAt: instant,
	returnAt: instant,
	extras: z.array(extraSelection).max(10).optional(),
}

export const quoteSchema = z.object(tripFields)

/** Admin walk-in booking: an existing customer id, or the details of a new customer. */
export const createBookingSchema = z.object({
	...tripFields,
	customerId: z.string().uuid().optional(),
	newCustomer: createCustomerSchema.optional(),
	pickupLocationId: z.string().uuid().optional(),
	returnLocationId: z.string().uuid().optional(),
	status: z.enum(["pending", "confirmed"]).optional(),
	paymentStatus: z.enum(["unpaid", "deposit_paid", "paid"]).optional(),
	notes: z.string().trim().max(1000).optional(),
})

export const pickupBookingSchema = z.object({ odometerKm: z.number().int().min(0) })
export const returnBookingSchema = z.object({ odometerKm: z.number().int().min(0) })
export const cancelBookingSchema = z.object({ reason: z.string().trim().min(1).max(300) })
export const setPaymentStatusSchema = z.object({ paymentStatus: z.enum(paymentStatuses) })

export type QuoteInput = z.infer<typeof quoteSchema>
export type CreateBookingInput = z.infer<typeof createBookingSchema>
export type BookingStatus = (typeof bookingStatuses)[number]
export type PaymentStatus = (typeof paymentStatuses)[number]

export type BookingSummary = {
	id: string
	reference: string
	status: BookingStatus
	paymentStatus: PaymentStatus
	pickupAt: string
	returnAt: string
	totalMinor: number
	car: { id: string; make: string; model: string; plate: string }
	customer: { id: string; name: string }
	pickupLocationName: string
}

export type BookingDetail = BookingSummary & {
	days: number
	rentalMinor: number
	extrasMinor: number
	taxMinor: number
	depositMinor: number
	taxPercent: number
	notes: string | null
	cancelReason: string | null
	pickupOdometerKm: number | null
	returnOdometerKm: number | null
	returnLocationName: string
	createdAt: string
	customerDetails: { email: string; phone: string; licenseNumber: string; licenseExpiresOn: string }
	extras: { name: string; quantity: number; totalMinor: number }[]
}
