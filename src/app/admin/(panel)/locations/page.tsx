import type { Location } from "@rentals/shared"
import { Plus } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/layout/page-header"
import { buttonVariants } from "@/components/ui/button"
import { LocationsTable } from "@/features/locations/locations-table"
import { serverApiRequest } from "@/lib/server-api"

export default async function LocationsPage() {
	const locations = await serverApiRequest<Location[]>("/v1/admin/locations")

	return (
		<>
			<PageHeader
				title="Locations"
				description="Pickup and drop-off points for your fleet."
				action={
					<Link href="/admin/locations/new" className={buttonVariants({ size: "lg" })}>
						<Plus /> Add location
					</Link>
				}
			/>
			<LocationsTable locations={locations} />
		</>
	)
}
