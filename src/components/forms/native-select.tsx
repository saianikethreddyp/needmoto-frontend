import { ChevronDown } from "lucide-react"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

/** Browser-native select styled like our inputs: reliable on mobile, no extra JS. */
export function NativeSelect({ className, children, ...props }: ComponentProps<"select">) {
	return (
		<div className="relative">
			<select
				className={cn(
					"h-11 w-full appearance-none rounded-xl border border-input bg-background pr-9 pl-3.5 text-sm outline-none transition-colors focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-foreground disabled:opacity-50 dark:bg-input/30",
					className,
				)}
				{...props}
			>
				{children}
			</select>
			<ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
		</div>
	)
}
