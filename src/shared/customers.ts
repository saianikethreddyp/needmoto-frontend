import { z } from "zod"

const customerFields = z.object({
	name: z.string().trim().min(1).max(100),
	email: z.string().trim().toLowerCase().email(),
	phone: z.string().trim().min(6).max(30),
	licenseNumber: z.string().trim().min(3).max(40),
	licenseExpiresOn: z.string().date(),
	dateOfBirth: z.string().date().nullable(),
})

export const createCustomerSchema = customerFields.partial().required({
	name: true,
	email: true,
	phone: true,
	licenseNumber: true,
	licenseExpiresOn: true,
})
export const updateCustomerSchema = customerFields.partial()

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>
export type Customer = z.infer<typeof customerFields> & {
	id: string
	createdAt: string
	bookingCount: number
}
