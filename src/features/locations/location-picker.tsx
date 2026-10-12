"use client"

import type { Location } from "@rentals/shared"
import { Building2, Check, MapPin, Plus, Search } from "lucide-react"
import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { QuickAddLocationDialog } from "./quick-add-location-dialog"

type LocationPickerProps = {
	locations: Location[]
	value: string
	onChange: (locationId: string) => void
	onLocationCreated?: (location: Location) => void
	error?: string
}

export function LocationPicker({
	locations,
	value,
	onChange,
	onLocationCreated,
	error,
}: LocationPickerProps) {
	const [search, setSearch] = useState("")
	const [dialogOpen, setDialogOpen] = useState(false)
	const [defaultIsHub, setDefaultIsHub] = useState(true)

	const selectedLocation = useMemo(() => locations.find((l) => l.id === value), [locations, value])

	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase()
		if (!q) return locations
		return locations.filter(
			(l) =>
				l.name.toLowerCase().includes(q) ||
				l.city.toLowerCase().includes(q) ||
				l.addressLine.toLowerCase().includes(q),
		)
	}, [locations, search])

	const hubs = useMemo(() => filtered.filter((l) => l.isHub), [filtered])
	const standalones = useMemo(() => filtered.filter((l) => !l.isHub), [filtered])

	function handleCreated(newLoc: Location) {
		onLocationCreated?.(newLoc)
		onChange(newLoc.id)
	}

	function openAdd(asHub: boolean) {
		setDefaultIsHub(asHub)
		setDialogOpen(true)
	}

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between gap-2">
				<span className="text-sm font-medium text-foreground">Stationed Location / Hub *</span>
				<div className="flex gap-1.5">
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => openAdd(true)}
						className="h-7 text-xs gap-1 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900"
					>
						<Plus className="size-3" /> Add Hub
					</Button>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => openAdd(false)}
						className="h-7 text-xs gap-1"
					>
						<Plus className="size-3" /> Add Location
					</Button>
				</div>
			</div>

			{selectedLocation && (
				<div className="flex items-center justify-between p-3 rounded-xl border border-primary/20 bg-primary/5 text-sm">
					<div className="flex items-start gap-2.5 min-w-0">
						{selectedLocation.isHub ? (
							<Building2 className="size-4.5 text-amber-600 mt-0.5 shrink-0" />
						) : (
							<MapPin className="size-4.5 text-sky-600 mt-0.5 shrink-0" />
						)}
						<div className="min-w-0">
							<div className="flex items-center gap-2 flex-wrap">
								<span className="font-semibold text-foreground truncate">
									{selectedLocation.name}
								</span>
								<Badge
									variant={selectedLocation.isHub ? "default" : "outline"}
									className={`text-[10px] px-1.5 py-0 ${selectedLocation.isHub ? "bg-amber-600" : ""}`}
								>
									{selectedLocation.isHub ? "Hub" : "Standalone"}
								</Badge>
							</div>
							<p className="text-xs text-muted-foreground truncate">
								{selectedLocation.addressLine}, {selectedLocation.city}
							</p>
						</div>
					</div>
					<Badge variant="secondary" className="text-xs shrink-0 font-medium">
						Selected
					</Badge>
				</div>
			)}

			<div className="relative">
				<Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
				<Input
					placeholder="Search hubs or standalone locations (e.g. Kukatpally, Secunderabad)..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="pl-9 text-xs sm:text-sm"
				/>
			</div>

			<div className="space-y-4 max-h-64 overflow-y-auto pr-1">
				{/* Hubs group */}
				<div>
					<div className="flex items-center gap-1.5 px-1 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
						<Building2 className="size-3 text-amber-600" />
						Major Hubs ({hubs.length})
					</div>
					{hubs.length === 0 ? (
						<p className="text-xs text-muted-foreground px-3 py-2 italic">
							{search
								? "No hubs matching search"
								: "No hubs added yet. Click '+ Add Hub' to create one."}
						</p>
					) : (
						<div className="grid gap-1.5 pt-1">
							{hubs.map((loc) => {
								const isSelected = loc.id === value
								return (
									<button
										key={loc.id}
										type="button"
										onClick={() => onChange(loc.id)}
										className={`w-full flex items-center justify-between text-left p-2.5 rounded-lg border text-sm transition-all ${
											isSelected
												? "border-primary bg-primary/10 font-medium"
												: "border-border hover:bg-muted/60"
										}`}
									>
										<div className="min-w-0">
											<div className="flex items-center gap-2">
												<span className="truncate">{loc.name}</span>
												<span className="text-[11px] text-muted-foreground">
													({loc.carCount ?? 0} {loc.carCount === 1 ? "car" : "cars"})
												</span>
											</div>
											<span className="text-xs text-muted-foreground block truncate">
												{loc.addressLine}, {loc.city}
											</span>
										</div>
										{isSelected && <Check className="size-4 text-primary shrink-0 ml-2" />}
									</button>
								)
							})}
						</div>
					)}
				</div>

				{/* Standalone locations group */}
				<div>
					<div className="flex items-center gap-1.5 px-1 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
						<MapPin className="size-3 text-sky-600" />
						Standalone Locations ({standalones.length})
					</div>
					{standalones.length === 0 ? (
						<p className="text-xs text-muted-foreground px-3 py-2 italic">
							{search
								? "No locations matching search"
								: "No standalone locations added yet (e.g. Secunderabad)."}
						</p>
					) : (
						<div className="grid gap-1.5 pt-1">
							{standalones.map((loc) => {
								const isSelected = loc.id === value
								return (
									<button
										key={loc.id}
										type="button"
										onClick={() => onChange(loc.id)}
										className={`w-full flex items-center justify-between text-left p-2.5 rounded-lg border text-sm transition-all ${
											isSelected
												? "border-primary bg-primary/10 font-medium"
												: "border-border hover:bg-muted/60"
										}`}
									>
										<div className="min-w-0">
											<div className="flex items-center gap-2">
												<span className="truncate">{loc.name}</span>
												<span className="text-[11px] text-muted-foreground">
													({loc.carCount ?? 0} {loc.carCount === 1 ? "car" : "cars"})
												</span>
											</div>
											<span className="text-xs text-muted-foreground block truncate">
												{loc.addressLine}, {loc.city}
											</span>
										</div>
										{isSelected && <Check className="size-4 text-primary shrink-0 ml-2" />}
									</button>
								)
							})}
						</div>
					)}
				</div>
			</div>

			{error && <p className="text-xs text-destructive font-medium">{error}</p>}

			<QuickAddLocationDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				onCreated={handleCreated}
				defaultIsHub={defaultIsHub}
			/>
		</div>
	)
}
