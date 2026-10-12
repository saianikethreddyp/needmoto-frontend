import type { Car, CarDetail, CreateCarInput, UpdateCarInput } from "@rentals/shared"
import { apiRequest } from "@/lib/api-client"

const basePath = "/v1/admin/cars"

export type ListCarsParams = {
	status?: string
	category?: string
	locationId?: string
	q?: string
	limit?: number
	offset?: number
}

export const listCars = (params?: ListCarsParams) => {
	const search = new URLSearchParams()
	if (params?.status) search.set("status", params.status)
	if (params?.category) search.set("category", params.category)
	if (params?.locationId) search.set("locationId", params.locationId)
	if (params?.q) search.set("q", params.q)
	if (params?.limit) search.set("limit", String(params.limit))
	if (params?.offset) search.set("offset", String(params.offset))
	const query = search.toString()
	return apiRequest<{ items: Car[]; total: number }>(query ? `${basePath}?${query}` : basePath)
}

export const getCarDetail = (id: string) => apiRequest<CarDetail>(`${basePath}/${id}`)

export const createCar = (input: CreateCarInput) =>
	apiRequest<Car>(basePath, { method: "POST", body: input })

export const updateCar = (id: string, input: UpdateCarInput) =>
	apiRequest<Car>(`${basePath}/${id}`, { method: "PATCH", body: input })

export const publishCar = (id: string) =>
	apiRequest<Car>(`${basePath}/${id}/publish`, { method: "POST" })

export const changeCarStatus = (id: string, status: "active" | "maintenance" | "retired") =>
	apiRequest<Car>(`${basePath}/${id}/status`, { method: "POST", body: { status } })
