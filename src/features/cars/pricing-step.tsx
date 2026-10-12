import Link from "next/link"
import type { UseFormReturn } from "react-hook-form"
import { FormField } from "@/components/forms/form-field"
import { NativeSelect } from "@/components/forms/native-select"
import { Input } from "@/components/ui/input"
import type { CarFormValues } from "./car-form-values"

type PricingStepProps = {
	form: UseFormReturn<CarFormValues>
	locations: { id: string; name: string }[]
}

export function PricingStep({ form, locations }: PricingStepProps) {
	const { register, formState } = form
	const { errors } = formState

	return (
		<div className="grid gap-5 sm:grid-cols-2">
			<FormField label="Daily price (₹)" htmlFor="dailyPrice" error={errors.dailyPrice?.message}>
				<Input
					id="dailyPrice"
					type="number"
					placeholder="3800"
					{...register("dailyPrice", {
						required: "Price is required",
						min: { value: 1, message: "Price must be above zero" },
					})}
				/>
			</FormField>
			<FormField label="Security deposit (₹)" htmlFor="deposit">
				<Input id="deposit" type="number" placeholder="10000" {...register("deposit")} />
			</FormField>
			<FormField label="Kilometres included per day" htmlFor="kmPerDay">
				<Input id="kmPerDay" type="number" {...register("kmPerDay")} />
			</FormField>
			<FormField label="Extra kilometre fee (₹)" htmlFor="extraKmFee">
				<Input id="extraKmFee" type="number" {...register("extraKmFee")} />
			</FormField>
			<FormField label="Minimum rental days" htmlFor="minDays">
				<Input id="minDays" type="number" {...register("minDays")} />
			</FormField>
			<FormField label="Home location" htmlFor="locationId" error={errors.locationId?.message}>
				<NativeSelect
					id="locationId"
					{...register("locationId", { required: "Choose a location" })}
				>
					<option value="">Select a location or hub</option>
					{locations.map((location) => (
						<option key={location.id} value={location.id}>
							{"isHub" in location && location.isHub ? "🏢 [Hub] " : "📍 "}
							{location.name}
							{"city" in location ? ` (${(location as { city?: string }).city})` : ""}
						</option>
					))}
				</NativeSelect>
				{locations.length === 0 && (
					<p className="text-xs text-muted-foreground">
						No locations yet.{" "}
						<Link href="/admin/locations/new" className="text-primary underline">
							Add one first
						</Link>
						.
					</p>
				)}
			</FormField>
		</div>
	)
}
