const apiUrl = process.env.NEXT_PUBLIC_API_URL

export class ApiError extends Error {
	constructor(
		public status: number,
		public code: string,
		message: string,
	) {
		super(message)
	}
}

type RequestOptions = {
	method?: "GET" | "POST" | "PATCH" | "DELETE"
	body?: unknown
	/** Cookie header to forward. Only needed when calling from the server. */
	cookie?: string
}

/** Calls the Rentals API and returns parsed JSON, or throws an ApiError. */
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
	const response = await fetch(`${apiUrl}${path}`, {
		method: options.method ?? "GET",
		headers: {
			...(options.body ? { "content-type": "application/json" } : {}),
			...(options.cookie ? { cookie: options.cookie } : {}),
		},
		body: options.body ? JSON.stringify(options.body) : undefined,
		credentials: "include",
		cache: "no-store",
	})

	if (!response.ok) {
		const { error } = await response.json().catch(() => ({ error: {} }))
		throw new ApiError(
			response.status,
			error?.code ?? "UNKNOWN",
			error?.message ?? "Request failed",
		)
	}
	return response.json()
}
