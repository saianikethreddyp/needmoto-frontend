import type { CarDocument } from "@rentals/shared"
import { FileText } from "lucide-react"
import { EmptyState } from "@/components/shared/empty-state"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { formatDate } from "@/lib/format"

const SOON_DAYS = 30

function getExpiryState(expiresOn: string) {
	const daysLeft = Math.ceil((new Date(expiresOn).getTime() - Date.now()) / 86_400_000)
	if (daysLeft < 0) return { label: "Expired", variant: "destructive" as const }
	if (daysLeft <= SOON_DAYS)
		return { label: `${daysLeft} days left`, variant: "secondary" as const }
	return { label: "Valid", variant: "outline" as const }
}

export function CarDocumentsTable({ documents }: { documents: CarDocument[] }) {
	if (documents.length === 0) {
		return (
			<EmptyState
				icon={FileText}
				title="No documents yet"
				description="Add insurance, registration and inspection papers from the edit screen."
			/>
		)
	}

	return (
		<Card className="gap-0 divide-y p-0">
			{documents.map((document) => {
				const state = getExpiryState(document.expiresOn)
				return (
					<div key={document.type} className="flex items-center gap-3 px-4 py-3">
						<span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
							<FileText className="size-4" />
						</span>
						<div className="flex-1">
							<p className="text-sm font-medium">{document.type}</p>
							<p className="text-xs text-muted-foreground">
								Expires {formatDate(document.expiresOn)}
							</p>
						</div>
						<Badge variant={state.variant}>{state.label}</Badge>
					</div>
				)
			})}
		</Card>
	)
}
