import type { BookingStatus, CarStatus, PaymentStatus } from "@rentals/shared"
import { cn } from "@/lib/utils"

type Tone = "success" | "warning" | "info" | "neutral" | "danger"

const toneClasses: Record<Tone, string> = {
	success: "bg-success/12 text-success",
	warning: "bg-warning/15 text-warning",
	info: "bg-info/12 text-info",
	neutral: "bg-muted text-muted-foreground",
	danger: "bg-destructive/10 text-destructive",
}

const statusTones: Record<
	CarStatus | BookingStatus | PaymentStatus,
	{ tone: Tone; label: string }
> = {
	draft: { tone: "neutral", label: "Draft" },
	active: { tone: "success", label: "Active" },
	maintenance: { tone: "warning", label: "Maintenance" },
	retired: { tone: "neutral", label: "Retired" },
	pending: { tone: "warning", label: "Pending" },
	confirmed: { tone: "info", label: "Confirmed" },
	completed: { tone: "neutral", label: "Completed" },
	cancelled: { tone: "danger", label: "Cancelled" },
	unpaid: { tone: "warning", label: "Unpaid" },
	deposit_paid: { tone: "info", label: "Deposit paid" },
	paid: { tone: "success", label: "Paid" },
	refunded: { tone: "neutral", label: "Refunded" },
}

type StatusBadgeProps = { status: keyof typeof statusTones; className?: string }

/** The single place that decides which colour a status gets. */
export function StatusBadge({ status, className }: StatusBadgeProps) {
	const { tone, label } = statusTones[status]
	return (
		<span
			className={cn(
				"inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold",
				toneClasses[tone],
				className,
			)}
		>
			<span className="size-1.5 rounded-full bg-current" />
			{label}
		</span>
	)
}
