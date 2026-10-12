import { z } from "zod"

export const extraPricings = ["per_day", "flat"] as const

const extraFields = z.object({
	name: z.string().trim().min(1).max(60),
	description: z.string().trim().max(200),
	priceMinor: z.number().int().min(0),
	pricing: z.enum(extraPricings),
	isActive: z.boolean(),
})

export const createExtraSchema = extraFields
	.partial()
	.required({ name: true, priceMinor: true, pricing: true })
export const updateExtraSchema = extraFields.partial()

export type CreateExtraInput = z.infer<typeof createExtraSchema>
export type UpdateExtraInput = z.infer<typeof updateExtraSchema>
export type Extra = z.infer<typeof extraFields> & { id: string }
