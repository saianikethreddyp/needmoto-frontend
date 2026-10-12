import type { carCategories, fuelTypes, transmissions } from "@rentals/shared"

export type PhotoItem = { id: string; name: string; previewUrl: string }
export type DocumentValue = { fileName: string; expiresOn: string }
export const documentTypes = ["Insurance", "Registration", "Inspection"] as const
export type DocumentType = (typeof documentTypes)[number]

export type CarFormValues = {
	make: string
	model: string
	year: string
	plate: string
	category: (typeof carCategories)[number]
	color: string
	seats: string
	doors: string
	luggage: string
	transmission: (typeof transmissions)[number]
	fuel: (typeof fuelTypes)[number]
	mileageKm: string
	features: string[]
	dailyPrice: string
	deposit: string
	kmPerDay: string
	extraKmFee: string
	minDays: string
	locationId: string
	photos: PhotoItem[]
	documents: Partial<Record<DocumentType, DocumentValue>>
}

export const featureOptions = [
	"Air conditioning",
	"Bluetooth",
	"GPS navigation",
	"Reverse camera",
	"Sunroof",
	"Child seat support",
	"USB charging",
	"Cruise control",
]

export const emptyCarValues: CarFormValues = {
	make: "",
	model: "",
	year: String(new Date().getFullYear()),
	plate: "",
	category: "sedan",
	color: "",
	seats: "5",
	doors: "4",
	luggage: "2",
	transmission: "manual",
	fuel: "petrol",
	mileageKm: "0",
	features: ["Air conditioning"],
	dailyPrice: "",
	deposit: "",
	kmPerDay: "250",
	extraKmFee: "12",
	minDays: "1",
	locationId: "",
	photos: [],
	documents: {},
}
