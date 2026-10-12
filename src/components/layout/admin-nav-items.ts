import {
	CalendarCheck,
	CalendarDays,
	Car,
	LayoutDashboard,
	MapPin,
	Package,
	Settings,
	Users,
} from "lucide-react"

export const adminNavGroups = [
	{
		label: "Overview",
		items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
	},
	{
		label: "Fleet",
		items: [
			{ label: "Cars", href: "/admin/cars", icon: Car },
			{ label: "Locations", href: "/admin/locations", icon: MapPin },
			{ label: "Extras", href: "/admin/extras", icon: Package },
		],
	},
	{
		label: "Operations",
		items: [
			{ label: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
			{ label: "Calendar", href: "/admin/calendar", icon: CalendarDays },
			{ label: "Customers", href: "/admin/customers", icon: Users },
		],
	},
	{
		label: "Business",
		items: [{ label: "Settings", href: "/admin/settings", icon: Settings }],
	},
] as const
