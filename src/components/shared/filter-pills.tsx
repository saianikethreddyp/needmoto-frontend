import { cn } from "@/lib/utils"

type FilterOption<T extends string> = { value: T; label: string; count?: number }
type FilterPillsProps<T extends string> = {
	options: FilterOption<T>[]
	value: T
	onChange: (value: T) => void
}

export function FilterPills<T extends string>({ options, value, onChange }: FilterPillsProps<T>) {
	return (
		<div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" role="tablist">
			{options.map((option) => {
				const isSelected = option.value === value
				return (
					<button
						key={option.value}
						type="button"
						role="tab"
						aria-selected={isSelected}
						onClick={() => onChange(option.value)}
						className={cn(
							"h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors",
							isSelected
								? "border-foreground bg-foreground text-background"
								: "hover:border-foreground/40",
						)}
					>
						{option.label}
						{option.count !== undefined && (
							<span
								className={cn(
									"ml-1.5 font-medium",
									isSelected ? "text-background/70" : "text-muted-foreground",
								)}
							>
								{option.count}
							</span>
						)}
					</button>
				)
			})}
		</div>
	)
}
