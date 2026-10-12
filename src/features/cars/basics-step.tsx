import type { Location } from "@rentals/shared"
import { carCategories } from "@rentals/shared"
import type { UseFormReturn } from "react-hook-form"
import { FormField } from "@/components/forms/form-field"
import { NativeSelect } from "@/components/forms/native-select"
import { Input } from "@/components/ui/input"
import { LocationPicker } from "@/features/locations/location-picker"
import type { CarFormValues } from "./car-form-values"
import { capitalize } from "./car-labels"

type BasicsStepProps = {
	form: UseFormReturn<CarFormValues>
	locations: Location[]
	onLocationCreated?: (location: Location) => void
}

export function BasicsStep({ form, locations, onLocationCreated }: BasicsStepProps) {
	const { register, formState, watch, setValue } = form
	const { errors } = formState
	const locationId = watch("locationId")

	return (
		<div className="space-y-6">
			<div className="grid gap-5 sm:grid-cols-2">
				<FormField label="Make" htmlFor="make" error={errors.make?.message}>
					<Input
						id="make"
						placeholder="Hyundai"
						{...register("make", { required: "Make is required" })}
					/>
				</FormField>
				<FormField label="Model" htmlFor="model" error={errors.model?.message}>
					<Input
						id="model"
						placeholder="Creta"
						{...register("model", { required: "Model is required" })}
					/>
				</FormField>
				<FormField label="Year" htmlFor="year" error={errors.year?.message}>
					<Input
						id="year"
						type="number"
						{...register("year", {
							required: "Year is required",
							min: { value: 1990, message: "Year must be 1990 or later" },
							max: { value: new Date().getFullYear() + 1, message: "Year is too far ahead" },
						})}
					/>
				</FormField>
				<FormField label="Number plate" htmlFor="plate" error={errors.plate?.message}>
					<Input
						id="plate"
						placeholder="TS 09 EA 1234"
						{...register("plate", { required: "Plate is required" })}
					/>
				</FormField>
				<FormField label="Category" htmlFor="category">
					<NativeSelect id="category" {...register("category")}>
						{carCategories.map((item) => (
							<option key={item} value={item}>
								{capitalize(item)}
							</option>
						))}
					</NativeSelect>
				</FormField>
				<FormField label="Colour" htmlFor="color">
					<Input id="color" placeholder="White" {...register("color")} />
				</FormField>
			</div>

			<div className="pt-2 border-t">
				<LocationPicker
					locations={locations}
					value={locationId}
					onChange={(id) => setValue("locationId", id, { shouldValidate: true })}
					onLocationCreated={onLocationCreated}
					error={errors.locationId?.message}
				/>
			</div>
		</div>
	)
}
