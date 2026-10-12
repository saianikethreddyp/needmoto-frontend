import { redirect } from "next/navigation"
import type { ReactNode } from "react"
import { AdminShell } from "@/components/layout/admin-shell"
import { getCurrentAdmin } from "@/features/auth/get-current-admin"
import { serverApiRequest } from "@/lib/server-api"

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
	const admin = await getCurrentAdmin()
	if (!admin) redirect("/admin/login")

	let pendingCount = 0
	try {
		const res = await serverApiRequest<{ total: number }>(
			"/v1/admin/bookings?status=pending&limit=1",
		)
		pendingCount = res.total ?? 0
	} catch {
		// 0 if unavailable
	}

	return (
		<AdminShell userName={admin.name} userEmail={admin.email} pendingBookings={pendingCount}>
			{children}
		</AdminShell>
	)
}
