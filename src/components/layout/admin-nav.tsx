"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { adminNavGroups } from "./admin-nav-items"

type AdminNavProps = { pendingBookings: number; onNavigate?: () => void }

export function AdminNav({ pendingBookings, onNavigate }: AdminNavProps) {
	const pathname = usePathname()

	const isActive = (href: string) =>
		href === "/admin" ? pathname === href : pathname.startsWith(href)

	return (
		<nav className="flex-1 space-y-6 overflow-y-auto px-4 py-2">
			{adminNavGroups.map((group) => (
				<div key={group.label}>
					<p className="mb-2 px-3 text-xs font-semibold text-muted-foreground">{group.label}</p>
					<ul className="space-y-0.5">
						{group.items.map(({ label, href, icon: Icon }) => (
							<li key={href}>
								<Link
									href={href}
									onClick={onNavigate}
									aria-current={isActive(href) ? "page" : undefined}
									className={cn(
										"flex h-11 items-center gap-3 rounded-xl px-3 text-[15px] transition-colors",
										isActive(href)
											? "bg-muted font-semibold text-foreground"
											: "font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground",
									)}
								>
									<Icon
										className={cn("size-5", isActive(href) && "text-primary")}
										strokeWidth={1.75}
									/>
									{label}
									{label === "Bookings" && pendingBookings > 0 && (
										<span className="ml-auto flex size-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
											{pendingBookings}
										</span>
									)}
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}
		</nav>
	)
}
