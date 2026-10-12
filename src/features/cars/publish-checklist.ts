import type { CarFormValues } from "./car-form-values"

export type ChecklistItem = { label: string; isDone: boolean }

/** Mirrors the server-side publish rules in ADMIN_PHASE_PLAN.md so the admin sees what blocks publishing. */
export function getPublishChecklist(values: CarFormValues): ChecklistItem[] {
	const insuranceExpiry = values.documents.Insurance?.expiresOn
	const hasValidInsurance =
		Boolean(insuranceExpiry) && new Date(insuranceExpiry as string) > new Date()

	return [
		{
			label: "Make, model, year and plate filled in",
			isDone: Boolean(values.make && values.model && values.year && values.plate),
		},
		{ label: "Daily price above zero", isDone: Number(values.dailyPrice) > 0 },
		{ label: "Home location chosen", isDone: Boolean(values.locationId) },
		{ label: "At least one photo (first one is the cover)", isDone: values.photos.length > 0 },
		{ label: "Insurance uploaded and not expired", isDone: hasValidInsurance },
	]
}
