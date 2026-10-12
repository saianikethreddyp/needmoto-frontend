import { z } from "zod"

export const carCategories = ["hatchback", "sedan", "suv", "luxury", "van"] as const
export const transmissions = ["manual", "automatic"] as const
export const fuelTypes = ["petrol", "diesel", "electric", "hybrid"] as const
export const carStatuses = ["draft", "active", "maintenance", "retired"] as const
export const documentTypes = ["insurance", "registration", "inspection"] as const

/** Plates are compared without spaces, dashes or case: "ts 09-ab 1234" equals "TS09AB1234". */
export const normalizePlate = (plate: string) => plate.replace(/[\s-]/g, "").toUpperCase()

// No defaults here on purpose (see locations.ts): PATCH must not reset fields.
// Prices are integer minor units (paise/cents); the form converts from major units.
const carFields = z.object({
	make: z.string().trim().min(1).max(50),
	model: z.string().trim().min(1).max(50),
	year: z
		.number()
		.int()
		.min(1990)
		.max(new Date().getFullYear() + 1),
	plate: z.string().trim().min(3).max(20).transform(normalizePlate),
	category: z.enum(carCategories),
	color: z.string().trim().max(30).nullable(),
	seats: z.number().int().min(1).max(15),
	doors: z.number().int().min(1).max(8),
	luggage: z.number().int().min(0).max(20),
	transmission: z.enum(transmissions),
	fuel: z.enum(fuelTypes),
	mileageKm: z.number().int().min(0),
	features: z.array(z.string().trim().min(1).max(40)).max(30),
	dailyPriceMinor: z.number().int().min(0),
	depositMinor: z.number().int().min(0),
	kmPerDay: z.number().int().min(0),
	extraKmFeeMinor: z.number().int().min(0),
	minDays: z.number().int().min(1).max(60),
	homeLocationId: z.string().uuid(),
})

/** Wizard step 1 creates a draft from the basics; every other field is filled in later. */
export const createCarSchema = carFields
	.pick({ make: true, model: true, year: true, plate: true, category: true })
	.extend(carFields.partial().shape)
	.required({ make: true, model: true, year: true, plate: true, category: true })

/** `expectedUpdatedAt` is the optimistic lock: the save fails with 409 if someone else saved first. */
export const updateCarSchema = carFields
	.partial()
	.extend({ expectedUpdatedAt: z.string().datetime().optional() })

export const changeCarStatusSchema = z.object({
	status: z.enum(["active", "maintenance", "retired"]),
})

export const registerPhotoSchema = z.object({ key: z.string().min(1) })
export const reorderPhotosSchema = z.object({ photoIds: z.array(z.string().uuid()).min(1) })
export const registerDocumentSchema = z.object({
	type: z.enum(documentTypes),
	key: z.string().min(1),
	fileName: z.string().min(1).max(200),
	expiresOn: z.string().date(),
})

export const createBlockSchema = z
	.object({
		startsAt: z.string().datetime(),
		endsAt: z.string().datetime(),
		reason: z.string().trim().min(1).max(200),
	})
	.refine((value) => new Date(value.endsAt) > new Date(value.startsAt), {
		message: "End must be after start",
		path: ["endsAt"],
	})

export type CreateCarInput = z.infer<typeof createCarSchema>
export type UpdateCarInput = z.infer<typeof updateCarSchema>
export type CarStatus = (typeof carStatuses)[number]
export type DocumentType = (typeof documentTypes)[number]

export type CarPhoto = { id: string; url: string; position: number }
export type CarDocument = {
	id: string
	type: DocumentType
	fileName: string
	expiresOn: string
}

/** A car as the API returns it; photos and documents are only on the detail response. */
export type Car = {
	id: string
	make: string
	model: string
	year: number
	plate: string
	category: (typeof carCategories)[number]
	color: string | null
	seats: number
	doors: number
	luggage: number
	transmission: (typeof transmissions)[number]
	fuel: (typeof fuelTypes)[number]
	mileageKm: number
	features: string[]
	dailyPriceMinor: number
	depositMinor: number
	kmPerDay: number
	extraKmFeeMinor: number
	minDays: number
	homeLocationId: string | null
	homeLocationName: string | null
	status: CarStatus
	coverUrl: string | null
	createdAt: string
	updatedAt: string
}

export type CarDetail = Car & { photos: CarPhoto[]; documents: CarDocument[] }
export type PublishCheck = { label: string; isDone: boolean }
