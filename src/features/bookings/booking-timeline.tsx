import type { BookingStatus } from "@rentals/shared"
import { Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDateTime } from "@/lib/format"
import { cn } from "@/lib/utils"

const stages = ["Requested", "Confirmed", "Picked up", "Returned"] as const
const stageReached: Record<BookingStatus, number> = {
	pending: 0,
	confirmed: 1,
	active: 2,
	completed: 3,
	cancelled: 0,
}

export function BookingTimeline({
	booking,
}: {
	booking: { status: BookingStatus; pickupAt: string }
}) {
	const reached = stageReached[booking.status]

	return (
		<Card>
			<CardHeader>
				<CardTitle>Timeline</CardTitle>
			</CardHeader>
			<CardContent>
				<ol className="space-y-4">
					{stages.map((stage, index) => (
						<li key={stage} className="flex items-center gap-3 text-sm">
							<span
								className={cn(
									"flex size-6 items-center justify-center rounded-full border",
									index <= reached && "border-primary bg-primary text-primary-foreground",
								)}
							>
								{index <= reached && <Check className="size-3.5" />}
							</span>
							<span className={cn(index > reached && "text-muted-foreground")}>{stage}</span>
							{index === 0 && (
								<span className="ml-auto text-xs text-muted-foreground">
									{formatDateTime(booking.pickupAt)}
								</span>
							)}
						</li>
					))}
				</ol>
				{booking.status === "cancelled" && (
					<p className="mt-4 text-sm text-destructive">This booking was cancelled.</p>
				)}
			</CardContent>
		</Card>
	)
}
