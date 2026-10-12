import type { Car } from "@rentals/shared"
import Link from "next/link"
import { StatusBadge } from "@/components/shared/status-badge"
import { formatMoney } from "@/lib/format"
import { capitalize, carName, formatPlate } from "./car-labels"
import { CarPhoto } from "./car-photo"

export function CarCard({ car }: { car: Car & { location?: string; hue?: number } }) {
	const locationText = car.homeLocationName ?? car.location ?? "No location"
	return (
		<Link href={`/admin/cars/${car.id}`} className="group block">
			<div className="relative overflow-hidden rounded-2xl">
				<CarPhoto
					car={car}
					className="aspect-[4/3] w-full transition-transform duration-300 group-hover:scale-[1.03]"
				/>
				<StatusBadge status={car.status} className="absolute top-3 left-3 bg-white shadow-sm" />
			</div>
			<div className="mt-3 flex items-start justify-between gap-3">
				<div className="min-w-0">
					<p className="truncate font-semibold">{carName(car)}</p>
					<p className="truncate text-sm text-muted-foreground">
						{formatPlate(car.plate)} · {locationText}
					</p>
					<p className="text-sm text-muted-foreground">
						{car.seats} seats · {capitalize(car.transmission)} · {capitalize(car.fuel)}
					</p>
				</div>
				<p className="shrink-0 text-right">
					<span className="font-semibold">{formatMoney(car.dailyPriceMinor)}</span>
					<span className="text-sm text-muted-foreground"> / day</span>
				</p>
			</div>
		</Link>
	)
}
