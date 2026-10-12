import { CarFront } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogoutButton } from "@/features/auth/logout-button"
import { toInitials } from "@/lib/format"
import { AdminNav } from "./admin-nav"

type AdminSidebarProps = {
	userName: string
	userEmail: string
	pendingBookings: number
	onNavigate?: () => void
}

export function AdminSidebar({
	userName,
	userEmail,
	pendingBookings,
	onNavigate,
}: AdminSidebarProps) {
	return (
		<div className="flex h-full flex-col bg-sidebar">
			<div className="flex h-20 shrink-0 items-center gap-3 px-6">
				<span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
					<CarFront className="size-5" />
				</span>
				<span className="text-xl font-bold tracking-tight">Rentals</span>
			</div>

			<AdminNav pendingBookings={pendingBookings} onNavigate={onNavigate} />

			<div className="m-3 rounded-2xl bg-muted p-3">
				<div className="flex items-center gap-3">
					<Avatar className="size-9">
						<AvatarFallback className="bg-foreground text-background">
							{toInitials(userName)}
						</AvatarFallback>
					</Avatar>
					<div className="min-w-0">
						<p className="truncate text-sm font-semibold">{userName}</p>
						<p className="truncate text-xs text-muted-foreground">{userEmail}</p>
					</div>
				</div>
				<LogoutButton />
			</div>
		</div>
	)
}
