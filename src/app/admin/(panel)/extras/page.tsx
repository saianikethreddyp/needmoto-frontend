import type { Extra } from "@rentals/shared"
import { PageHeader } from "@/components/layout/page-header"
import { ExtrasGrid } from "@/features/extras/extras-grid"
import { serverApiRequest } from "@/lib/server-api"

export default async function ExtrasPage() {
	let extras: Extra[] = []
	try {
		extras = await serverApiRequest<Extra[]>("/v1/admin/extras")
	} catch {
		extras = []
	}

	return (
		<>
			<PageHeader title="Extras" description="Add-ons customers can attach to a booking." />
			<ExtrasGrid extras={extras} />
		</>
	)
}
