import type { CreateLocationInput, Location } from "@rentals/shared"
import { weekdayNames } from "./weekdays"

type HoursFormValues = { weekday: number; isClosed: boolean; opensAt: string; closesAt: string }

/** Everything is a string or boolean so inputs stay simple; converted on submit. */
export type LocationFormValues = {
	name: string
	addressLine: string
	city: string
	state: string
	country: string
	latitude: string
	longitude: string
	phone: string
	timezone: string
	allowsPickup: boolean
	allowsDropoff: boolean
	isAirport: boolean
	isHub: boolean
	isActive: boolean
	hours: HoursFormValues[]
}

const defaultHours = weekdayNames.map((_, weekday) => ({
	weekday,
	isClosed: false,
	opensAt: "08:00",
	closesAt: "20:00",
}))

export const emptyLocationValues: LocationFormValues = {
	name: "",
	addressLine: "",
	city: "Hyderabad",
	state: "Telangana",
	country: "India",
	latitude: "",
	longitude: "",
	phone: "",
	timezone: "Asia/Kolkata",
	allowsPickup: true,
	allowsDropoff: true,
	isAirport: false,
	isHub: false,
	isActive: true,
	hours: defaultHours,
}

/** Fills the form from a saved location. Times arrive as "HH:MM:SS"; inputs want "HH:MM". */
export function toFormValues(location: Location): LocationFormValues {
	const savedHours = new Map(location.hours?.map((h) => [h.weekday, h]))

	return {
		...emptyLocationValues,
		...location,
		latitude: location.latitude?.toString() ?? "",
		longitude: location.longitude?.toString() ?? "",
		phone: location.phone ?? "",
		hours: defaultHours.map((fallback) => {
			const saved = savedHours.get(fallback.weekday)
			if (!saved) return { ...fallback, isClosed: savedHours.size > 0 }
			return {
				weekday: saved.weekday,
				isClosed: saved.isClosed,
				opensAt: saved.opensAt?.slice(0, 5) ?? fallback.opensAt,
				closesAt: saved.closesAt?.slice(0, 5) ?? fallback.closesAt,
			}
		}),
	}
}

/** Converts form strings into the shape the API expects. */
export function toLocationInput(values: LocationFormValues) {
	return {
		...values,
		latitude: values.latitude === "" ? null : Number(values.latitude),
		longitude: values.longitude === "" ? null : Number(values.longitude),
		phone: values.phone === "" ? null : values.phone,
		hours: values.hours.map((h) =>
			h.isClosed ? { weekday: h.weekday, isClosed: true, opensAt: null, closesAt: null } : h,
		),
	} satisfies Partial<CreateLocationInput> & { isActive: boolean }
}
