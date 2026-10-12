import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type StepperProps = { steps: string[]; current: number; onSelect: (index: number) => void }

export function Stepper({ steps, current, onSelect }: StepperProps) {
	return (
		<ol className="flex items-center gap-2 overflow-x-auto pb-1">
			{steps.map((label, index) => {
				const isDone = index < current
				const isCurrent = index === current
				return (
					<li key={label} className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => onSelect(index)}
							className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm whitespace-nowrap hover:bg-muted"
						>
							<span
								className={cn(
									"flex size-6 items-center justify-center rounded-full border text-xs font-medium",
									isDone && "border-primary bg-primary text-primary-foreground",
									isCurrent && "border-primary text-primary",
								)}
							>
								{isDone ? <Check className="size-3.5" /> : index + 1}
							</span>
							<span className={cn(isCurrent ? "font-medium" : "text-muted-foreground")}>
								{label}
							</span>
						</button>
						{index < steps.length - 1 && <span className="h-px w-6 shrink-0 bg-border" />}
					</li>
				)
			})}
		</ol>
	)
}
