"use client"

import { createLocationSchema, type Location, updateLocationSchema } from "@rentals/shared"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LocationDetailsFields } from "./location-details-fields"
import {
	emptyLocationValues,
	type LocationFormValues,
	toFormValues,
	toLocationInput,
} from "./location-form-values"
import { createLocation, updateLocation } from "./locations.api"
import { OpeningHoursFields } from "./opening-hours-fields"

/** Add form when no location is given, edit form otherwise. */
export function LocationForm({ location }: { location?: Location }) {
	const router = useRouter()
	const [hoursError, setHoursError] = useState("")
	const { register, handleSubmit, watch, setValue, setError, formState } =
		useForm<LocationFormValues>({
			defaultValues: location ? toFormValues(location) : emptyLocationValues,
		})

	async function onSubmit(values: LocationFormValues) {
		const schema = location ? updateLocationSchema : createLocationSchema
		const parsed = schema.safeParse(toLocationInput(values))

		if (!parsed.success) {
			setHoursError("")
			for (const issue of parsed.error.issues) {
				const field = String(issue.path[0])
				if (field === "hours") setHoursError(issue.message)
				else setError(field as keyof LocationFormValues, { message: issue.message })
			}
			return
		}

		try {
			if (location) await updateLocation(location.id, parsed.data)
			else await createLocation(parsed.data as Parameters<typeof createLocation>[0])
			toast.success(location ? "Location updated" : "Location added")
			router.push("/admin/locations")
			router.refresh()
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not save the location")
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Details</CardTitle>
				</CardHeader>
				<CardContent>
					<LocationDetailsFields
						register={register}
						errors={formState.errors}
						watch={watch}
						setValue={setValue}
						showActiveToggle={Boolean(location)}
					/>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Opening hours</CardTitle>
				</CardHeader>
				<CardContent>
					<OpeningHoursFields
						register={register}
						watch={watch}
						setValue={setValue}
						error={hoursError}
					/>
				</CardContent>
			</Card>

			<div className="flex justify-end gap-3">
				<Link
					href="/admin/locations"
					className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
				>
					Cancel
				</Link>
				<Button type="submit" size="lg" disabled={formState.isSubmitting}>
					{formState.isSubmitting ? "Saving..." : "Save location"}
				</Button>
			</div>
		</form>
	)
}
