import type { Car } from "@rentals/shared"

export const carName = (car: Pick<Car, "make" | "model">) => `${car.make} ${car.model}`

/** "TS09EA1234" -> "TS 09 EA 1234" for display; the stored plate stays normalized. */
export const formatPlate = (plate: string) =>
	plate.replace(/^([A-Z]{2})(\d{2})([A-Z]{1,3})(\d{4})$/, "$1 $2 $3 $4")

export const capitalize = (text: string) =>
	text === "suv" ? "SUV" : text.charAt(0).toUpperCase() + text.slice(1)

const swatches: Record<string, string> = {
	White: "#f4f2ee",
	Black: "#1d1d1f",
	Grey: "#8a8d91",
	Silver: "#bfc3c7",
	Red: "#b8322a",
	Blue: "#2f5d9e",
	Teal: "#2a8a86",
	Yellow: "#d9b83a",
	Maroon: "#6d1f2b",
}

export const carColorSwatch = (color: string) => swatches[color] ?? "#a8a29e"
