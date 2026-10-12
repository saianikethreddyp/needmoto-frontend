import type { Location } from "@rentals/shared"
import { PageHeader } from "@/components/layout/page-header"
import { CarWizard } from "@/features/cars/car-wizard"
import { serverApiRequest } from "@/lib/server-api"

export default async function NewCarPage() {
	const locations = await serverApiRequest<Location[]>("/v1/admin/locations")
	const activeLocations = locations.filter((location) => location.isActive)

	return (
		<>
			<PageHeader title="Add a car" description="Four quick steps, then publish when it's ready." />
			<CarWizard locations={activeLocations} />
		</>
	)
}
