import { cookies } from "next/headers"
import { apiRequest } from "@/lib/api-client"

export type CurrentUser = { id: string; name: string; email: string; role: string }

/** Returns the signed-in admin, or null when signed out or not an admin. */
export async function getCurrentAdmin(): Promise<CurrentUser | null> {
	const cookie = (await cookies()).toString()
	try {
		const user = await apiRequest<CurrentUser>("/v1/me", { cookie })
		return user.role === "admin" ? user : null
	} catch {
		return null
	}
}
