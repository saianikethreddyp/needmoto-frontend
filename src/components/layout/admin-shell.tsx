"use client"

import { CarFront, Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { type ReactNode, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { AdminSidebar } from "./admin-sidebar"

type AdminShellProps = {
	userName: string
	userEmail: string
	pendingBookings: number
	children: ReactNode
}

/** Fixed sidebar on large screens, slide-over menu behind a top bar on small ones. */
export function AdminShell({ children, ...sidebarProps }: AdminShellProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const pathname = usePathname()

	// biome-ignore lint/correctness/useExhaustiveDependencies: close the menu whenever the route changes
	useEffect(() => setIsMenuOpen(false), [pathname])

	return (
		<div className="min-h-screen bg-background">
			<aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-sidebar-border lg:block">
				<AdminSidebar {...sidebarProps} />
			</aside>

			<header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background px-4 lg:hidden">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setIsMenuOpen(true)}
					aria-label="Open menu"
				>
					<Menu />
				</Button>
				<span className="flex items-center gap-2 font-semibold">
					<span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
						<CarFront className="size-4" />
					</span>{" "}
					<span className="text-lg font-bold tracking-tight">Rentals</span>
				</span>
			</header>

			<Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
				<SheetContent side="left" className="w-72 gap-0 p-0">
					<SheetTitle className="sr-only">Menu</SheetTitle>
					<SheetDescription className="sr-only">Admin navigation</SheetDescription>
					<AdminSidebar {...sidebarProps} onNavigate={() => setIsMenuOpen(false)} />
				</SheetContent>
			</Sheet>

			<main className="lg:pl-64">
				<div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</div>
			</main>
		</div>
	)
}
