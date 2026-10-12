import { fuelTypes, transmissions } from "@rentals/shared"
import type { UseFormReturn } from "react-hook-form"
import { FormField } from "@/components/forms/form-field"
import { NativeSelect } from "@/components/forms/native-select"
import { Input } from "@/components/ui/input"
import type { CarFormValues } from "./car-form-values"
import { capitalize } from "./car-labels"
import { FeatureToggles } from "./feature-toggles"

export function SpecsStep({ form }: { form: UseFormReturn<CarFormValues> }) {
	const { register, watch, setValue, formState } = form

	return (
		<div className="space-y-6">
			<div className="grid gap-5 sm:grid-cols-3">
				<FormField label="Seats" htmlFor="seats" error={formState.errors.seats?.message}>
					<Input
						id="seats"
						type="number"
						{...register("seats", {
							required: "Seats are required",
							min: { value: 1, message: "At least 1 seat" },
							max: { value: 15, message: "At most 15 seats" },
						})}
					/>
				</FormField>
				<FormField label="Doors" htmlFor="doors">
					<Input id="doors" type="number" {...register("doors")} />
				</FormField>
				<FormField label="Luggage (bags)" htmlFor="luggage">
					<Input id="luggage" type="number" {...register("luggage")} />
				</FormField>
				<FormField label="Transmission" htmlFor="transmission">
					<NativeSelect id="transmission" {...register("transmission")}>
						{transmissions.map((item) => (
							<option key={item} value={item}>
								{capitalize(item)}
							</option>
						))}
					</NativeSelect>
				</FormField>
				<FormField label="Fuel" htmlFor="fuel">
					<NativeSelect id="fuel" {...register("fuel")}>
						{fuelTypes.map((item) => (
							<option key={item} value={item}>
								{capitalize(item)}
							</option>
						))}
					</NativeSelect>
				</FormField>
				<FormField label="Odometer (km)" htmlFor="mileageKm">
					<Input id="mileageKm" type="number" {...register("mileageKm")} />
				</FormField>
			</div>
			<div className="space-y-2">
				<p className="text-sm font-medium">Features</p>
				<FeatureToggles
					selected={watch("features")}
					onChange={(features) => setValue("features", features)}
				/>
			</div>
		</div>
	)
}
