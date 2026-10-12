import type { Car } from "@rentals/shared"
import { Plus } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/layout/page-header"
import { buttonVariants } from "@/components/ui/button"
import { CarsBrowser } from "@/features/cars/cars-browser"
import { serverApiRequest } from "@/lib/server-api"

export default async function CarsPage() {
	let cars: (Car & { location?: string; hue?: number })[] = []
	try {
		const res = await serverApiRequest<{ items: Car[]; total: number }>("/v1/admin/cars")
		if (res.items) {
			cars = res.items.map((car, idx) => ({
				...car,
				location: car.homeLocationName ?? "Unassigned",
				hue: (idx * 65) % 360,
			}))
		}
	} catch {
		// Empty if unreachable
	}

	return (
		<>
			<PageHeader
				title="Cars"
				description="Your fleet. Publish a car to make it bookable."
				action={
					<Link href="/admin/cars/new" className={buttonVariants({ size: "lg" })}>
						<Plus /> Add car
					</Link>
				}
			/>
			<CarsBrowser cars={cars} />
		</>
	)
}
