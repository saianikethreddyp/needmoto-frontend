const CURRENCY = "INR"

const moneyFormatter = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: CURRENCY,
	maximumFractionDigits: 0,
})

/** Prices are stored as integer minor units (paise); this shows them in major units. */
export const formatMoney = (minor: number) => moneyFormatter.format(minor / 100)

// Dates are built from numeric parts in a fixed timezone, so the server and the browser
// always print the same text (locale-formatted strings differ between Node and Chrome).
// Replace the fixed zone with the location's timezone once bookings come from the API.
const TIME_ZONE = "Asia/Kolkata"
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const partsFormatter = new Intl.DateTimeFormat("en-GB", {
	timeZone: TIME_ZONE,
	year: "numeric",
	month: "numeric",
	day: "numeric",
	hour: "numeric",
	minute: "numeric",
	hourCycle: "h23",
})

function getParts(iso: string) {
	const parts = Object.fromEntries(
		partsFormatter.formatToParts(new Date(iso)).map((part) => [part.type, Number(part.value)]),
	)
	return {
		year: parts.year,
		month: MONTHS[parts.month - 1],
		day: parts.day,
		hour: parts.hour,
		minute: parts.minute,
	}
}

function toClock(hour: number, minute: number) {
	const hour12 = hour % 12 === 0 ? 12 : hour % 12
	return `${hour12}:${String(minute).padStart(2, "0")} ${hour < 12 ? "am" : "pm"}`
}

export const formatDate = (iso: string) => {
	const { day, month, year } = getParts(iso)
	return `${day} ${month} ${year}`
}

export const formatDateTime = (iso: string) => {
	const { day, month, hour, minute } = getParts(iso)
	return `${day} ${month}, ${toClock(hour, minute)}`
}

export const formatTime = (iso: string) => {
	const { hour, minute } = getParts(iso)
	return toClock(hour, minute)
}

export const toInitials = (name: string) =>
	name
		.split(" ")
		.map((part) => part[0])
		.slice(0, 2)
		.join("")
		.toUpperCase()
