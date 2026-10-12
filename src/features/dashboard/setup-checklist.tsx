import { Check } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type SetupStep = { label: string; done: boolean; href: string }

export function SetupChecklist({ steps }: { steps: SetupStep[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Finish setting up</CardTitle>
			</CardHeader>
			<CardContent className="divide-y">
				{steps.map((step) => (
					<div key={step.label} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
						<span
							className={cn(
								"flex size-6 items-center justify-center rounded-full border",
								step.done && "border-primary bg-primary text-primary-foreground",
							)}
						>
							{step.done && <Check className="size-3.5" />}
						</span>
						<span
							className={cn("flex-1 text-sm", step.done && "text-muted-foreground line-through")}
						>
							{step.label}
						</span>
						{!step.done && (
							<Link href={step.href} className={buttonVariants({ size: "sm", variant: "outline" })}>
								Start
							</Link>
						)}
					</div>
				))}
			</CardContent>
		</Card>
	)
}
