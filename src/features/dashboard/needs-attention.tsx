import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/format"
import { cn } from "@/lib/utils"

type AttentionItem = { key: string; href: string; text: string; tone: "warning" | "danger" }

export function NeedsAttention({
	pendingApprovals = 0,
	expiringDocuments = [],
}: {
	pendingApprovals?: number
	expiringDocuments?: {
		carId: string
		make: string
		model: string
		type: string
		expiresOn: string
	}[]
}) {
	const items: AttentionItem[] = [
		...(pendingApprovals > 0
			? [
					{
						key: "pending",
						href: "/admin/bookings",
						text: `${pendingApprovals} booking${pendingApprovals === 1 ? "" : "s"} waiting for approval`,
						tone: "warning" as const,
					},
				]
			: []),
		...expiringDocuments.map((doc) => ({
			key: `${doc.carId}-${doc.type}`,
			href: `/admin/cars/${doc.carId}`,
			text: `${doc.make} ${doc.model}: ${doc.type.toLowerCase()} expires ${formatDate(doc.expiresOn)}`,
			tone: "danger" as const,
		})),
	]

	return (
		<Card>
			<CardHeader>
				<CardTitle>Needs attention</CardTitle>
			</CardHeader>
			<CardContent>
				{items.length === 0 ? (
					<p className="py-4 text-sm text-muted-foreground">All clear.</p>
				) : (
					<ul className="divide-y">
						{items.map((item) => (
							<li key={item.key}>
								<Link
									href={item.href}
									className="flex items-start gap-3 py-3 text-sm hover:text-foreground/70"
								>
									<span
										className={cn(
											"mt-1.5 size-1.5 shrink-0 rounded-full",
											item.tone === "danger" ? "bg-destructive" : "bg-warning",
										)}
									/>
									{item.text}
								</Link>
							</li>
						))}
					</ul>
				)}
			</CardContent>
		</Card>
	)
}
