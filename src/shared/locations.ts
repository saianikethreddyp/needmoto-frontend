import { z } from "zod"

const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use HH:MM")

const isValidTimezone = (value: string) => {
	try {
		new Intl.DateTimeFormat(undefined, { timeZone: value })
		return true
	} catch {
		return false
	}
}

export const locationHoursSchema = z
	.object({
		weekday: z.number().int().min(0).max(6), // 0 = Sunday
		isClosed: z.boolean().default(false),
		opensAt: time.nullable().default(null),
		closesAt: time.nullable().default(null),
	})
	.refine((h) => h.isClosed || (h.opensAt && h.closesAt && h.opensAt < h.closesAt), {
		message: "Open days need an opening time before the closing time",
	})

const weeklyHours = z
	.array(locationHoursSchema)
	.max(7)
	.refine((hours) => new Set(hours.map((h) => h.weekday)).size === hours.length, {
		message: "Each weekday can appear only once",
	})

// No defaults here on purpose: the database fills them in, and PATCH must not reset fields.
export const createLocationSchema = z.object({
	name: z.string().trim().min(1).max(100),
	addressLine: z.string().trim().min(1).max(200),
	city: z.string().trim().min(1).max(100),
	state: z.string().trim().min(1).max(100).default("Telangana"),
	country: z.string().trim().min(1).max(100).default("India"),
	latitude: z.number().min(-90).max(90).nullable().optional(),
	longitude: z.number().min(-180).max(180).nullable().optional(),
	phone: z.string().trim().max(30).nullable().optional(),
	timezone: z.string().refine(isValidTimezone, "Unknown timezone").default("Asia/Kolkata"),
	allowsPickup: z.boolean().optional(),
	allowsDropoff: z.boolean().optional(),
	isAirport: z.boolean().optional(),
	isHub: z.boolean().default(false),
	hours: weeklyHours.optional(),
})

export const updateLocationSchema = createLocationSchema
	.partial()
	.extend({ isActive: z.boolean().optional() })

export type CreateLocationInput = z.infer<typeof createLocationSchema>
export type UpdateLocationInput = z.infer<typeof updateLocationSchema>

/** Shape of a location as returned by the API. */
export type Location = {
	id: string
	name: string
	addressLine: string
	city: string
	state: string
	country: string
	latitude: number | null
	longitude: number | null
	phone: string | null
	timezone: string
	allowsPickup: boolean
	allowsDropoff: boolean
	isAirport: boolean
	isHub: boolean
	isActive: boolean
	carCount?: number
	hours?: LocationHours[]
}

/** Times come back from the database as "HH:MM:SS". */
export type LocationHours = {
	weekday: number
	isClosed: boolean
	opensAt: string | null
	closesAt: string | null
}
