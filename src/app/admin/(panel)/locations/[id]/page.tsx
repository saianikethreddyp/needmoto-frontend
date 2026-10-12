import type { Location } from "@rentals/shared"
import { PageHeader } from "@/components/layout/page-header"
import { LocationForm } from "@/features/locations/location-form"
import { serverApiRequest } from "@/lib/server-api"

export default async function EditLocationPage({ params }: PageProps<"/admin/locations/[id]">) {
	const { id } = await params
	const location = await serverApiRequest<Location>(`/v1/admin/locations/${id}`)

	return (
		<>
			<PageHeader title={location.name} description="Edit location details and opening hours." />
			<LocationForm location={location} />
		</>
	)
}
