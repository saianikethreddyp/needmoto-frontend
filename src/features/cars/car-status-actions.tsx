"use client"

import type { CarStatus } from "@rentals/shared"
import { MoreHorizontal, Pencil } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button, buttonVariants } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { changeCarStatus, publishCar } from "./cars.api"

type CarStatusActionsProps = { carId: string; status: CarStatus }

export function CarStatusActions({ carId, status }: CarStatusActionsProps) {
	const router = useRouter()

	async function updateStatus(nextStatus: "active" | "maintenance" | "retired") {
		try {
			if (nextStatus === "active") await publishCar(carId)
			else await changeCarStatus(carId, nextStatus)
			toast.success(`Car status updated to ${nextStatus}`)
			router.refresh()
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to update status")
		}
	}

	return (
		<>
			<Link
				href={`/admin/cars/${carId}/edit`}
				className={buttonVariants({ variant: "outline", size: "lg" })}
			>
				<Pencil /> Edit
			</Link>
			<DropdownMenu>
				<DropdownMenuTrigger
					render={<Button variant="outline" size="icon-lg" aria-label="More actions" />}
				>
					<MoreHorizontal />
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{status !== "active" && (
						<DropdownMenuItem onClick={() => updateStatus("active")}>Publish</DropdownMenuItem>
					)}
					{status === "active" && (
						<DropdownMenuItem onClick={() => updateStatus("maintenance")}>
							Move to maintenance
						</DropdownMenuItem>
					)}
					{status === "maintenance" && (
						<DropdownMenuItem onClick={() => updateStatus("active")}>
							Back to active
						</DropdownMenuItem>
					)}
					<DropdownMenuSeparator />
					<DropdownMenuItem variant="destructive" onClick={() => updateStatus("retired")}>
						Retire car
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
