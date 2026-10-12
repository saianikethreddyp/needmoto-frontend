const DAY_MS = 86_400_000
const MINUTE_MS = 60_000

/** Rental days = whole days, rounded up, with a small grace period (59 free minutes by default). */
export function countRentalDays(pickupAt: Date, returnAt: Date, graceMinutes = 59): number {
	const elapsed = returnAt.getTime() - pickupAt.getTime()
	const days = Math.ceil((elapsed - graceMinutes * MINUTE_MS) / DAY_MS)
	return Math.max(days, 1)
}

export type PricedExtra = {
	name: string
	pricing: "per_day" | "flat"
	unitPriceMinor: number
	quantity: number
}

export type PriceInput = {
	days: number
	dailyPriceMinor: number
	depositMinor: number
	taxPercent: number
	extras: PricedExtra[]
}

export type PriceBreakdown = {
	days: number
	rentalMinor: number
	extrasMinor: number
	taxMinor: number
	totalMinor: number
	depositMinor: number
	extraLines: (PricedExtra & { totalMinor: number })[]
}

/** Pure and server-authoritative: the booking stores this result as a snapshot. Tax is added on top; the deposit is separate. */
export function calculatePrice(input: PriceInput): PriceBreakdown {
	const rentalMinor = input.days * input.dailyPriceMinor
	const extraLines = input.extras.map((extra) => ({
		...extra,
		totalMinor:
			extra.unitPriceMinor * extra.quantity * (extra.pricing === "per_day" ? input.days : 1),
	}))
	const extrasMinor = extraLines.reduce((sum, line) => sum + line.totalMinor, 0)
	const taxMinor = Math.round(((rentalMinor + extrasMinor) * input.taxPercent) / 100)

	return {
		days: input.days,
		rentalMinor,
		extrasMinor,
		taxMinor,
		totalMinor: rentalMinor + extrasMinor + taxMinor,
		depositMinor: input.depositMinor,
		extraLines,
	}
}
