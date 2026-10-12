"use client"

import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { authClient } from "./auth-client"

export function LogoutButton() {
	const router = useRouter()

	async function handleLogout() {
		await authClient.signOut()
		router.push("/admin/login")
		router.refresh()
	}

	return (
		<Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start gap-2">
			<LogOut /> Sign out
		</Button>
	)
}
