import type { Location } from "@rentals/shared"
import { MapPin } from "lucide-react"
import Link from "next/link"
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

export function LocationsTable({ locations }: { locations: Location[] }) {
	if (locations.length === 0) {
		return (
			<Card className="flex flex-col items-center gap-2 py-16 text-center">
				<MapPin className="size-8 text-muted-foreground" />
				<p className="font-medium">No locations yet</p>
				<p className="text-sm text-muted-foreground">Add a pickup point to start listing cars.</p>
			</Card>
		)
	}

	return (
		<Card className="p-0">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="pl-6">Name</TableHead>
						<TableHead>Type</TableHead>
						<TableHead>City</TableHead>
						<TableHead>Cars Stationed</TableHead>
						<TableHead>Timezone</TableHead>
						<TableHead className="pr-6">Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{locations.map((location) => (
						<TableRow key={location.id}>
							<TableCell className="pl-6 font-medium">
								<Link href={`/admin/locations/${location.id}`} className="hover:text-primary">
									{location.name}
								</Link>
							</TableCell>
							<TableCell>
								<Badge
									variant={location.isHub ? "default" : "outline"}
									className={location.isHub ? "bg-amber-600 hover:bg-amber-700" : ""}
								>
									{location.isHub ? "Hub" : "Standalone"}
								</Badge>
							</TableCell>
							<TableCell>
								{location.city}, {location.country}
							</TableCell>
							<TableCell>
								<span className="font-medium text-foreground">{location.carCount ?? 0}</span>
								<span className="text-xs text-muted-foreground ml-1">cars</span>
							</TableCell>
							<TableCell className="text-muted-foreground">{location.timezone}</TableCell>
							<TableCell className="pr-6">
								<Badge variant={location.isActive ? "default" : "secondary"}>
									{location.isActive ? "Active" : "Inactive"}
								</Badge>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	)
}
