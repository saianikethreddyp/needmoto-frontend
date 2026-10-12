import type { BookingSummary, CarDetail } from "@rentals/shared"
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/layout/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookingsList } from "@/features/bookings/bookings-list"
import { CarDocumentsTable } from "@/features/cars/car-documents-table"
import { capitalize, carName, formatPlate } from "@/features/cars/car-labels"
import { CarPhoto } from "@/features/cars/car-photo"
import { CarSpecList } from "@/features/cars/car-spec-list"
import { CarStatusActions } from "@/features/cars/car-status-actions"
import { formatMoney } from "@/lib/format"
import { serverApiRequest } from "@/lib/server-api"

export default async function CarDetailPage({ params }: PageProps<"/admin/cars/[id]">) {
	const { id } = await params
	let car: CarDetail
	try {
		car = await serverApiRequest<CarDetail>(`/v1/admin/cars/${id}`)
	} catch {
		notFound()
	}

	let bookings: BookingSummary[] = []
	try {
		const res = await serverApiRequest<{ items: BookingSummary[]; total: number }>(
			`/v1/admin/bookings?carId=${id}`,
		)
		bookings = res.items
	} catch {
		bookings = []
	}

	const locationName = car.homeLocationName ?? "Unassigned"

	return (
		<>
			<PageHeader
				title={carName(car)}
				description={`${car.year} · ${locationName}`}
				action={<CarStatusActions carId={car.id} status={car.status} />}
			/>
			<div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center">
				<CarPhoto car={car} className="aspect-[4/3] w-full rounded-2xl sm:w-96" />
				<div className="space-y-3">
					<StatusBadge status={car.status} />
					<p>
						<span className="text-3xl font-bold tracking-tight">
							{formatMoney(car.dailyPriceMinor)}
						</span>
						<span className="text-muted-foreground"> / day</span>
					</p>
					<p className="text-sm text-muted-foreground">
						{formatPlate(car.plate)} · {car.seats} seats · {capitalize(car.transmission)}
					</p>
				</div>
			</div>
			<Tabs defaultValue="overview">
				<TabsList variant="line">
					<TabsTrigger value="overview" className="px-3">
						Overview
					</TabsTrigger>
					<TabsTrigger value="bookings" className="px-3">
						Bookings ({bookings.length})
					</TabsTrigger>
					<TabsTrigger value="documents" className="px-3">
						Documents
					</TabsTrigger>
				</TabsList>
				<TabsContent value="overview" className="pt-4">
					<CarSpecList car={car} />
				</TabsContent>
				<TabsContent value="bookings" className="pt-4">
					<BookingsList bookings={bookings} />
				</TabsContent>
				<TabsContent value="documents" className="pt-4">
					<CarDocumentsTable documents={car.documents} />
				</TabsContent>
			</Tabs>
		</>
	)
}
