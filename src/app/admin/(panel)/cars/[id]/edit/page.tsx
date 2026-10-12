import type { CarDetail, Location } from "@rentals/shared"
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/layout/page-header"
import { carName } from "@/features/cars/car-labels"
import { carToFormValues } from "@/features/cars/car-to-form-values"
import { CarWizard } from "@/features/cars/car-wizard"
import { serverApiRequest } from "@/lib/server-api"

export default async function EditCarPage({ params }: PageProps<"/admin/cars/[id]/edit">) {
	const { id } = await params
	let car: CarDetail
	try {
		car = await serverApiRequest<CarDetail>(`/v1/admin/cars/${id}`)
	} catch {
		notFound()
	}

	const locations = (await serverApiRequest<Location[]>("/v1/admin/locations")).filter(
		(location) => location.isActive,
	)

	return (
		<>
			<PageHeader title={`Edit ${carName(car)}`} description="Changes apply once you publish." />
			<CarWizard
				locations={locations}
				initialValues={carToFormValues(car, car.homeLocationId ?? undefined)}
			/>
		</>
	)
}
