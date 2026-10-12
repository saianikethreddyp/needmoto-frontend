"use client"

import type { BookingStatus, BookingSummary } from "@rentals/shared"
import { CalendarCheck, Search } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"
import { EmptyState } from "@/components/shared/empty-state"
import { FilterPills } from "@/components/shared/filter-pills"
import { StatusBadge } from "@/components/shared/status-badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { formatDateTime, formatMoney } from "@/lib/format"

type BookingsBrowserProps = { bookings: BookingSummary[] }

const tabs: { value: "all" | BookingStatus; label: string }[] = [
	{ value: "all", label: "All" },
	{ value: "pending", label: "Pending" },
	{ value: "confirmed", label: "Confirmed" },
	{ value: "active", label: "On the road" },
	{ value: "completed", label: "Completed" },
	{ value: "cancelled", label: "Cancelled" },
]

export function BookingsBrowser({ bookings }: BookingsBrowserProps) {
	const [status, setStatus] = useState<"all" | BookingStatus>("all")
	const [search, setSearch] = useState("")

	const rows = useMemo(() => {
		const query = search.trim().toLowerCase()
		return bookings
			.filter((booking) => status === "all" || booking.status === status)
			.filter((b) =>
				`${b.reference} ${b.customer?.name} ${b.car?.make} ${b.car?.model} ${b.car?.plate}`
					.toLowerCase()
					.includes(query),
			)
	}, [bookings, status, search])

	return (
		<div className="space-y-5">
			<FilterPills value={status} onChange={setStatus} options={tabs} />
			<div className="relative max-w-md">
				<Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					value={search}
					onChange={(event) => setSearch(event.target.value)}
					placeholder="Search reference, customer or car"
					className="h-11 rounded-full pl-10"
				/>
			</div>

			{rows.length === 0 ? (
				<EmptyState
					icon={CalendarCheck}
					title="No bookings found"
					description="Nothing matches these filters."
				/>
			) : (
				<Card className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="pl-4">Reference</TableHead>
								<TableHead>Customer</TableHead>
								<TableHead className="hidden md:table-cell">Car</TableHead>
								<TableHead className="hidden lg:table-cell">Pickup</TableHead>
								<TableHead className="hidden sm:table-cell">Total</TableHead>
								<TableHead className="pr-4">Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{rows.map((booking) => (
								<TableRow key={booking.id}>
									<TableCell className="pl-4 font-medium">
										<Link href={`/admin/bookings/${booking.id}`} className="hover:text-primary">
											{booking.reference}
										</Link>
									</TableCell>
									<TableCell>{booking.customer?.name}</TableCell>
									<TableCell className="hidden md:table-cell">
										{booking.car?.make} {booking.car?.model}
									</TableCell>
									<TableCell className="hidden text-muted-foreground lg:table-cell">
										{formatDateTime(booking.pickupAt)}
									</TableCell>
									<TableCell className="hidden sm:table-cell">
										{formatMoney(booking.totalMinor)}
									</TableCell>
									<TableCell className="pr-4">
										<StatusBadge status={booking.status} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Card>
			)}
		</div>
	)
}
