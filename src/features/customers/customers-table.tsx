import type { Customer } from "@rentals/shared"
import { Users } from "lucide-react"
import { EmptyState } from "@/components/shared/empty-state"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { formatDate, toInitials } from "@/lib/format"

type CustomersTableProps = { customers: Customer[] }

export function CustomersTable({ customers }: CustomersTableProps) {
	if (customers.length === 0) {
		return (
			<EmptyState
				icon={Users}
				title="No customers yet"
				description="Renters appear here after their first booking."
			/>
		)
	}

	return (
		<Card className="p-0">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="pl-4">Customer</TableHead>
						<TableHead className="hidden md:table-cell">Phone</TableHead>
						<TableHead>Licence</TableHead>
						<TableHead className="hidden sm:table-cell pr-4 text-right">Bookings</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{customers.map((customer) => {
						const isLicenseExpired = new Date(customer.licenseExpiresOn) < new Date()
						return (
							<TableRow key={customer.id}>
								<TableCell className="pl-4">
									<div className="flex items-center gap-3">
										<Avatar>
											<AvatarFallback>{toInitials(customer.name)}</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-medium">{customer.name}</p>
											<p className="text-xs text-muted-foreground">{customer.email}</p>
										</div>
									</div>
								</TableCell>
								<TableCell className="hidden text-muted-foreground md:table-cell">
									{customer.phone}
								</TableCell>
								<TableCell>
									<Badge variant={isLicenseExpired ? "destructive" : "outline"}>
										{isLicenseExpired
											? "Expired"
											: `Valid to ${formatDate(customer.licenseExpiresOn)}`}
									</Badge>
								</TableCell>
								<TableCell className="hidden pr-4 text-right sm:table-cell">
									{customer.bookingCount ?? 0}
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</Card>
	)
}
