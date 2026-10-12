import type { CreateLocationInput, Location, UpdateLocationInput } from "@rentals/shared"
import { apiRequest } from "@/lib/api-client"

const basePath = "/v1/admin/locations"

export const listLocations = () => apiRequest<Location[]>(basePath)

export const createLocation = (input: CreateLocationInput) =>
	apiRequest<Location>(basePath, { method: "POST", body: input })

export const updateLocation = (id: string, input: UpdateLocationInput) =>
	apiRequest<Location>(`${basePath}/${id}`, { method: "PATCH", body: input })
