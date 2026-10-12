"use client"

import type { Location } from "@rentals/shared"
import { Building2, MapPin } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createLocation } from "./locations.api"

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
	onCreated: (location: Location) => void
	defaultIsHub?: boolean
}

export function QuickAddLocationDialog({
	open,
	onOpenChange,
	onCreated,
	defaultIsHub = true,
}: Props) {
	const [name, setName] = useState("")
	const [isHub, setIsHub] = useState(defaultIsHub)
	const [addressLine, setAddressLine] = useState("")
	const [city, setCity] = useState("Hyderabad")
	const [phone, setPhone] = useState("")
	const [loading, setLoading] = useState(false)

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!name.trim()) {
			toast.error("Please enter a location name")
			return
		}
		if (!addressLine.trim()) {
			toast.error("Please enter an address or landmark")
			return
		}

		setLoading(true)
		try {
			const created = await createLocation({
				name: name.trim(),
				addressLine: addressLine.trim(),
				city: city.trim(),
				state: "Telangana",
				country: "India",
				timezone: "Asia/Kolkata",
				isHub,
				phone: phone.trim() || null,
			})
			toast.success(isHub ? `Hub "${created.name}" created` : `Location "${created.name}" created`)
			onCreated(created)
			onOpenChange(false)
			setName("")
			setAddressLine("")
			setPhone("")
		} catch (err) {
			const message = err instanceof Error ? err.message : "Failed to create location"
			toast.error(message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<form onSubmit={handleSubmit} className="space-y-4">
					<DialogHeader>
						<DialogTitle>{isHub ? "Add New Hub" : "Add New Location"}</DialogTitle>
						<DialogDescription>
							Add a parking hub or standalone pickup point. No coordinates required.
						</DialogDescription>
					</DialogHeader>

					<div className="flex gap-2 p-1 bg-muted rounded-lg">
						<button
							type="button"
							onClick={() => setIsHub(true)}
							className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all ${
								isHub
									? "bg-background text-foreground shadow-xs"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							<Building2 className="size-3.5 text-amber-600" />
							Primary Hub (Multi-car)
						</button>
						<button
							type="button"
							onClick={() => setIsHub(false)}
							className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all ${
								!isHub
									? "bg-background text-foreground shadow-xs"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							<MapPin className="size-3.5 text-sky-600" />
							Standalone Location
						</button>
					</div>

					<div className="space-y-3">
						<div className="space-y-1.5">
							<Label htmlFor="loc-name">{isHub ? "Hub Name" : "Location Name"} *</Label>
							<Input
								id="loc-name"
								placeholder={
									isHub ? "e.g. Kukatpally Hub, LB Nagar Hub" : "e.g. Secunderabad, Banjara Hills"
								}
								value={name}
								onChange={(e) => setName(e.target.value)}
								autoFocus
							/>
						</div>

						<div className="space-y-1.5">
							<Label htmlFor="loc-address">Address / Landmark *</Label>
							<Input
								id="loc-address"
								placeholder="e.g. Near Metro Station Pillar 12, Main Road"
								value={addressLine}
								onChange={(e) => setAddressLine(e.target.value)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<div className="space-y-1.5">
								<Label htmlFor="loc-city">City</Label>
								<Input id="loc-city" value={city} onChange={(e) => setCity(e.target.value)} />
							</div>
							<div className="space-y-1.5">
								<Label htmlFor="loc-phone">Phone (Optional)</Label>
								<Input
									id="loc-phone"
									placeholder="+91 98765 43210"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
								/>
							</div>
						</div>
					</div>

					<DialogFooter className="pt-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
							disabled={loading}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={loading}>
							{loading ? "Adding..." : isHub ? "Add Hub" : "Add Location"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
