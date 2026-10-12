"use client"

import type { Car, CarStatus } from "@rentals/shared"
import { carCategories } from "@rentals/shared"
import { Car as CarIcon, Search } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"
import { NativeSelect } from "@/components/forms/native-select"
import { EmptyState } from "@/components/shared/empty-state"
import { FilterPills } from "@/components/shared/filter-pills"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CarCard } from "./car-card"
import { capitalize, carName } from "./car-labels"

const statusTabs: { value: "all" | CarStatus; label: string }[] = [
	{ value: "all", label: "All" },
	{ value: "active", label: "Active" },
	{ value: "draft", label: "Drafts" },
	{ value: "maintenance", label: "Maintenance" },
	{ value: "retired", label: "Retired" },
]

export function CarsBrowser({ cars }: { cars: (Car & { location?: string; hue?: number })[] }) {
	const [search, setSearch] = useState("")
	const [status, setStatus] = useState<"all" | CarStatus>("all")
	const [category, setCategory] = useState("all")

	const visibleCars = useMemo(() => {
		const query = search.trim().toLowerCase()
		return cars.filter(
			(car) =>
				(status === "all" || car.status === status) &&
				(category === "all" || car.category === category) &&
				(!query || `${carName(car)} ${car.plate}`.toLowerCase().includes(query)),
		)
	}, [cars, search, status, category])

	const countFor = (value: "all" | CarStatus) =>
		value === "all" ? cars.length : cars.filter((car) => car.status === value).length

	return (
		<div className="space-y-5">
			<FilterPills
				value={status}
				onChange={setStatus}
				options={statusTabs.map((tab) => ({ ...tab, count: countFor(tab.value) }))}
			/>

			<div className="flex flex-col gap-3 sm:flex-row">
				<div className="relative flex-1">
					<Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Search by name or plate"
						className="h-11 rounded-full pl-10"
					/>
				</div>
				<NativeSelect
					value={category}
					onChange={(event) => setCategory(event.target.value)}
					className="sm:w-48"
					aria-label="Category"
				>
					<option value="all">All categories</option>
					{carCategories.map((item) => (
						<option key={item} value={item}>
							{capitalize(item)}
						</option>
					))}
				</NativeSelect>
			</div>

			{visibleCars.length === 0 ? (
				<EmptyState
					icon={CarIcon}
					title="No cars match"
					description="Try a different search or clear the filters."
					action={
						<Link href="/admin/cars/new" className={buttonVariants({ variant: "outline" })}>
							Add a car
						</Link>
					}
				/>
			) : (
				<div className="grid gap-x-6 gap-y-9 sm:grid-cols-2 xl:grid-cols-3">
					{visibleCars.map((car) => (
						<CarCard key={car.id} car={car} />
					))}
				</div>
			)}
		</div>
	)
}
