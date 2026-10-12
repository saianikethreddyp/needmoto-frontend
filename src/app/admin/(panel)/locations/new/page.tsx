import { PageHeader } from "@/components/layout/page-header"
import { LocationForm } from "@/features/locations/location-form"

export default function NewLocationPage() {
	return (
		<>
			<PageHeader title="Add location" description="Where customers can pick up and return cars." />
			<LocationForm />
		</>
	)
}
