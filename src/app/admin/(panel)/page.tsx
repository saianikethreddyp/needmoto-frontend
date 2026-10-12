import type { DashboardData, Location } from "@rentals/shared"
import { Plus } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/layout/page-header"
import { StatCards } from "@/components/shared/stat-cards"
import { buttonVariants } from "@/components/ui/button"
import { getCurrentAdmin } from "@/features/auth/get-current-admin"
import { buildReservationGroups } from "@/features/dashboard/build-reservation-groups"
import { FleetStatus } from "@/features/dashboard/fleet-status"
import { NeedsAttention } from "@/features/dashboard/needs-attention"
import { ReservationsPanel } from "@/features/dashboard/reservations-panel"
import { RevenueBars } from "@/features/dashboard/revenue-bars"
import { SetupChecklist } from "@/features/dashboard/setup-checklist"
import { formatMoney } from "@/lib/format"
import { serverApiRequest } from "@/lib/server-api"

const defaultDashboard: DashboardData = {
	timeZone: "Asia/Kolkata",
	revenueThisMonthMinor: 0,
	revenueLastMonthMinor: 0,
	onTheRoad: 0,
	publishedCars: 0,
	totalCars: 0,
	maintenanceCars: 0,
	utilizationPercent: 0,
	reservations: {
		arriving: [],
		leaving: [],
		renting: [],
		upcoming: [],
	},
	pendingApprovals: 0,
	expiringDocuments: [],
	revenueLast7Days: [],
}

function getGreeting() {
	const hour = new Date().getHours()
	if (hour < 12) return "Good morning"
	return hour < 18 ? "Good afternoon" : "Good evening"
}

export default async function AdminDashboardPage() {
	const admin = await getCurrentAdmin()
	let locations: Location[] = []
	let dashboard: DashboardData = defaultDashboard

	try {
		const [locs, dash] = await Promise.all([
			serverApiRequest<Location[]>("/v1/admin/locations"),
			serverApiRequest<DashboardData>("/v1/admin/dashboard"),
		])
		locations = locs
		dashboard = dash
	} catch {
		// Use empty defaults
	}

	const groups = buildReservationGroups(dashboard.reservations)
	const revenueTrend =
		dashboard.revenueLastMonthMinor > 0
			? `${Math.round(((dashboard.revenueThisMonthMinor - dashboard.revenueLastMonthMinor) / dashboard.revenueLastMonthMinor) * 100)}% vs last month`
			: "This month"

	const days = (dashboard.revenueLast7Days ?? []).map((day) => {
		const d = new Date(day.date)
		const label = d.toLocaleDateString("en-US", { weekday: "short" })
		return { label, amountMinor: day.amountMinor }
	})

	return (
		<>
			<PageHeader
				title={`${getGreeting()}, ${admin?.name.split(" ")[0] ?? "there"}`}
				description="Here's what's happening across your fleet today."
				action={
					<Link href="/admin/cars/new" className={buttonVariants({ size: "lg" })}>
						<Plus /> Add car
					</Link>
				}
			/>
			<div className="space-y-10">
				{locations.length === 0 && (
					<SetupChecklist
						steps={[
							{ label: "Add your first location", done: false, href: "/admin/locations/new" },
							{ label: "Add your first car", done: false, href: "/admin/cars/new" },
						]}
					/>
				)}

				<StatCards
					stats={[
						{
							label: "Revenue this month",
							value: formatMoney(dashboard.revenueThisMonthMinor),
							hint: revenueTrend,
						},
						{
							label: "On the road",
							value: String(dashboard.onTheRoad),
							hint: `${groups.leaving.length} returning today`,
						},
						{
							label: "Cars available",
							value: `${Math.max(0, dashboard.publishedCars - dashboard.onTheRoad)} of ${dashboard.totalCars}`,
							hint: "Active cars",
						},
						{ label: "Utilization", value: `${dashboard.utilizationPercent}%`, hint: "Right now" },
					]}
				/>

				<div className="grid gap-10 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<ReservationsPanel groups={groups} />
					</div>
					<NeedsAttention
						pendingApprovals={dashboard.pendingApprovals}
						expiringDocuments={dashboard.expiringDocuments}
					/>
				</div>

				<div className="grid gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<RevenueBars days={days} />
					</div>
					<FleetStatus
						onTheRoad={dashboard.onTheRoad}
						publishedCars={dashboard.publishedCars}
						maintenanceCars={dashboard.maintenanceCars}
						utilizationPercent={dashboard.utilizationPercent}
					/>
				</div>
			</div>
		</>
	)
}
