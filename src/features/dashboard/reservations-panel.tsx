"use client"

import type { BookingStatus } from "@rentals/shared"
import Link from "next/link"
import { useState } from "react"
import { FilterPills } from "@/components/shared/filter-pills"
import { StatusBadge } from "@/components/shared/status-badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { toInitials } from "@/lib/format"

export type ReservationRow = {
	id: string
	customer: string
	car: string
	location: string
	when: string
	status: BookingStatus
}

export type ReservationGroups = Record<
	"arriving" | "leaving" | "renting" | "upcoming",
	ReservationRow[]
>

const groupLabels = {
	arriving: "Picking up today",
	leaving: "Returning today",
	renting: "On the road",
	upcoming: "Upcoming",
} as const

type GroupKey = keyof typeof groupLabels

export function ReservationsPanel({ groups }: { groups: ReservationGroups }) {
	const [selected, setSelected] = useState<GroupKey>("arriving")
	const rows = groups[selected]

	return (
		<section className="space-y-4">
			<h2 className="text-xl font-bold tracking-tight">Your reservations</h2>
			<FilterPills
				value={selected}
				onChange={setSelected}
				options={(Object.keys(groupLabels) as GroupKey[]).map((key) => ({
					value: key,
					label: groupLabels[key],
					count: groups[key].length,
				}))}
			/>
			<Card className="gap-0 py-2">
				{rows.length === 0 ? (
					<p className="px-6 py-10 text-center text-sm text-muted-foreground">
						Nothing here right now.
					</p>
				) : (
					rows.map((row) => (
						<Link
							key={row.id}
							href={`/admin/bookings/${row.id}`}
							className="flex items-center gap-4 border-b px-6 py-4 transition-colors last:border-b-0 hover:bg-muted/50"
						>
							<Avatar className="size-11">
								<AvatarFallback className="font-semibold">
									{toInitials(row.customer)}
								</AvatarFallback>
							</Avatar>
							<div className="min-w-0 flex-1">
								<p className="truncate font-semibold">{row.customer}</p>
								<p className="truncate text-sm text-muted-foreground">
									{row.car} · {row.location}
								</p>
							</div>
							<span className="hidden text-sm text-muted-foreground sm:block">{row.when}</span>
							<StatusBadge status={row.status} />
						</Link>
					))
				)}
			</Card>
		</section>
	)
}
