import type { Car, CarDetail } from "@rentals/shared"
import { type CarFormValues, emptyCarValues } from "./car-form-values"

/** Edit mode starts from the car's current values; photos stay empty until uploads exist. */
export function carToFormValues(car: Car | CarDetail, locationId?: string): CarFormValues {
	return {
		...emptyCarValues,
		make: car.make,
		model: car.model,
		year: String(car.year),
		plate: car.plate,
		category: car.category,
		color: car.color ?? "",
		seats: String(car.seats),
		doors: String(car.doors ?? 4),
		luggage: String(car.luggage ?? 2),
		transmission: car.transmission,
		fuel: car.fuel,
		mileageKm: String(car.mileageKm),
		features: car.features ?? ["Air conditioning"],
		dailyPrice: car.dailyPriceMinor ? String(car.dailyPriceMinor / 100) : "",
		deposit: car.depositMinor ? String(car.depositMinor / 100) : "",
		kmPerDay: String(car.kmPerDay ?? 250),
		extraKmFee: car.extraKmFeeMinor ? String(car.extraKmFeeMinor / 100) : "12",
		minDays: String(car.minDays ?? 1),
		locationId: locationId ?? car.homeLocationId ?? "",
	}
}
