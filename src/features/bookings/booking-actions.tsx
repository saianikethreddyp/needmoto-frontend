"use client"

import type { BookingStatus } from "@rentals/shared"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { cancelBooking, confirmBooking, pickupBooking, returnBooking } from "./bookings.api"

type BookingActionsProps = { bookingId: string; status: BookingStatus }

export function BookingActions({ bookingId, status }: BookingActionsProps) {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	async function handleAction(action: "confirm" | "pickup" | "return" | "cancel") {
		setLoading(true)
		try {
			if (action === "confirm") {
				await confirmBooking(bookingId)
				toast.success("Booking confirmed")
			} else if (action === "pickup") {
				await pickupBooking(bookingId, 0)
				toast.success("Car marked as picked up")
			} else if (action === "return") {
				await returnBooking(bookingId, 0)
				toast.success("Car marked as returned")
			} else if (action === "cancel") {
				await cancelBooking(bookingId, "Cancelled by admin")
				toast.success("Booking cancelled")
			}
			router.refresh()
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Failed to execute action")
		} finally {
			setLoading(false)
		}
	}

	if (status === "completed" || status === "cancelled") return null

	return (
		<div className="flex gap-2">
			{status === "pending" && (
				<>
					<Button size="lg" disabled={loading} onClick={() => handleAction("confirm")}>
						Confirm booking
					</Button>
					<Button
						variant="outline"
						size="lg"
						disabled={loading}
						onClick={() => handleAction("cancel")}
					>
						Decline
					</Button>
				</>
			)}
			{status === "confirmed" && (
				<>
					<Button size="lg" disabled={loading} onClick={() => handleAction("pickup")}>
						Mark picked up
					</Button>
					<Button
						variant="outline"
						size="lg"
						disabled={loading}
						onClick={() => handleAction("cancel")}
					>
						Cancel booking
					</Button>
				</>
			)}
			{status === "active" && (
				<Button size="lg" disabled={loading} onClick={() => handleAction("return")}>
					Mark returned
				</Button>
			)}
		</div>
	)
}
