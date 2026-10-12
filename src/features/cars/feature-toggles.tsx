import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { featureOptions } from "./car-form-values"

type FeatureTogglesProps = { selected: string[]; onChange: (features: string[]) => void }

export function FeatureToggles({ selected, onChange }: FeatureTogglesProps) {
	const toggle = (feature: string) =>
		onChange(
			selected.includes(feature)
				? selected.filter((item) => item !== feature)
				: [...selected, feature],
		)

	return (
		<div className="flex flex-wrap gap-2">
			{featureOptions.map((feature) => {
				const isOn = selected.includes(feature)
				return (
					<button
						key={feature}
						type="button"
						aria-pressed={isOn}
						onClick={() => toggle(feature)}
						className={cn(
							"flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
							isOn ? "border-primary bg-primary/10 text-primary" : "hover:bg-muted",
						)}
					>
						{isOn && <Check className="size-3.5" />}
						{feature}
					</button>
				)
			})}
		</div>
	)
}
