import { Check, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { CarFormValues } from "./car-form-values"
import { capitalize } from "./car-labels"
import { getPublishChecklist } from "./publish-checklist"

export function ReviewStep({ values }: { values: CarFormValues }) {
	const summary = [
		["Car", `${values.year} ${values.make} ${values.model}`.trim() || "—"],
		["Plate", values.plate || "—"],
		["Category", capitalize(values.category)],
		[
			"Drivetrain",
			`${capitalize(values.transmission)}, ${capitalize(values.fuel)}, ${values.seats} seats`,
		],
		["Price", values.dailyPrice ? `₹${values.dailyPrice} / day` : "—"],
		["Photos", `${values.photos.length} added`],
	]

	return (
		<div className="grid gap-6 md:grid-cols-2">
			<dl className="divide-y rounded-xl border text-sm">
				{summary.map(([label, value]) => (
					<div key={label} className="flex justify-between gap-4 px-4 py-3">
						<dt className="text-muted-foreground">{label}</dt>
						<dd className="text-right font-medium">{value}</dd>
					</div>
				))}
			</dl>
			<div className="rounded-xl border p-4">
				<h3 className="mb-3 text-sm font-medium">Before you can publish</h3>
				<ul className="space-y-2.5">
					{getPublishChecklist(values).map((item) => (
						<li key={item.label} className="flex items-start gap-2.5 text-sm">
							{item.isDone ? (
								<Check className="mt-0.5 size-4 shrink-0 text-success" />
							) : (
								<Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
							)}
							<span className={cn(!item.isDone && "text-muted-foreground")}>{item.label}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
