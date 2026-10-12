"use client"

import type { Extra } from "@rentals/shared"
import { Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { FormField } from "@/components/forms/form-field"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { formatMoney } from "@/lib/format"

export function ExtrasGrid({ extras }: { extras: Extra[] }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	function addExtra() {
		setIsDialogOpen(false)
		toast.info("Preview only: saving extras arrives in Phase D.")
	}

	return (
		<>
			<div className="mb-6 flex justify-end">
				<Button size="lg" onClick={() => setIsDialogOpen(true)}>
					<Plus /> Add extra
				</Button>
			</div>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{extras.map((extra) => (
					<Card key={extra.id} className="gap-3 px-4">
						<div className="flex items-start justify-between gap-3">
							<p className="font-medium">{extra.name}</p>
							<Switch defaultChecked={extra.isActive} aria-label={`${extra.name} available`} />
						</div>
						<p className="text-sm text-muted-foreground">{extra.description}</p>
						<p className="text-sm">
							<span className="font-semibold">{formatMoney(extra.priceMinor)}</span>
							<span className="text-muted-foreground"> {extra.pricing}</span>
						</p>
					</Card>
				))}
			</div>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add an extra</DialogTitle>
						<DialogDescription>Optional add-ons customers can pick at checkout.</DialogDescription>
					</DialogHeader>
					<div className="space-y-4">
						<FormField label="Name" htmlFor="extra-name">
							<Input id="extra-name" placeholder="Child seat" />
						</FormField>
						<FormField label="Price (₹)" htmlFor="extra-price">
							<Input id="extra-price" type="number" placeholder="300" />
						</FormField>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={addExtra}>Add extra</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
}
