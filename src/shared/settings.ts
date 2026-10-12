import { z } from "zod"

const settingsFields = z.object({
	businessName: z.string().trim().max(100),
	supportEmail: z.union([z.literal(""), z.string().trim().email()]),
	supportPhone: z.string().trim().max(30),
	currency: z.string().length(3),
	taxPercent: z.number().min(0).max(100),
	defaultDepositMinor: z.number().int().min(0),
	minDriverAge: z.number().int().min(16).max(99),
	bufferMinutes: z.number().int().min(0).max(1440),
	requireApproval: z.boolean(),
	allowPayAtPickup: z.boolean(),
	freeCancellationHours: z.number().int().min(0).max(720),
	terms: z.string().max(10000),
	notifyNewBooking: z.boolean(),
	notifyDocumentExpiry: z.boolean(),
	notifyPickupReminder: z.boolean(),
})

export const updateSettingsSchema = settingsFields.partial()
export type Settings = z.infer<typeof settingsFields>
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>
