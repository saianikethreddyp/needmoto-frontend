import type { Customer } from "@rentals/shared"
import { PageHeader } from "@/components/layout/page-header"
import { CustomersTable } from "@/features/customers/customers-table"
import { serverApiRequest } from "@/lib/server-api"

export default async function CustomersPage() {
	let customers: Customer[] = []
	try {
		const res = await serverApiRequest<{ items: Customer[]; total: number }>("/v1/admin/customers")
		customers = res.items
	} catch {
		customers = []
	}

	return (
		<>
			<PageHeader title="Customers" description="Everyone who has rented from you." />
			<CustomersTable customers={customers} />
		</>
	)
}
