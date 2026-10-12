import { CarFront } from "lucide-react"
import { redirect } from "next/navigation"
import { getCurrentAdmin } from "@/features/auth/get-current-admin"
import { LoginForm } from "@/features/auth/login-form"

export default async function AdminLoginPage() {
	if (await getCurrentAdmin()) redirect("/admin")

	return (
		<div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
			<div className="w-full max-w-sm rounded-2xl border bg-card p-8 shadow-sm">
				<span className="mb-6 flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
					<CarFront className="size-5" />
				</span>
				<h1 className="text-xl font-semibold tracking-tight">Admin sign in</h1>
				<p className="mb-6 mt-1 text-sm text-muted-foreground">
					Manage your fleet, locations and bookings.
				</p>
				<LoginForm />
			</div>
		</div>
	)
}
