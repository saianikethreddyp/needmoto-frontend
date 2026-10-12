import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ApiError, apiRequest } from "./api-client"

/**
 * Same as apiRequest, but forwards the visitor's session cookie and sends
 * signed-out visitors to the login page. Server Components only.
 */
export async function serverApiRequest<T>(path: string): Promise<T> {
	const cookie = (await cookies()).toString()
	try {
		return await apiRequest<T>(path, { cookie })
	} catch (error) {
		if (error instanceof ApiError && error.status === 401) redirect("/admin/login")
		throw error
	}
}
