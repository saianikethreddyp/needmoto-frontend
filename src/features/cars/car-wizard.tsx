"use client"

import type { CreateCarInput, Location } from "@rentals/shared"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Stepper } from "@/components/shared/stepper"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BasicsStep } from "./basics-step"
import { type CarFormValues, emptyCarValues } from "./car-form-values"
import { createCar, publishCar } from "./cars.api"
import { MediaStep } from "./media-step"
import { PricingStep } from "./pricing-step"
import { getPublishChecklist } from "./publish-checklist"
import { ReviewStep } from "./review-step"
import { SpecsStep } from "./specs-step"

const stepLabels = ["Basics & Location", "Specs", "Pricing", "Photos & documents", "Review"]
const fieldsPerStep: (keyof CarFormValues)[][] = [
	["make", "model", "year", "plate", "locationId"],
	["seats"],
	["dailyPrice", "locationId"],
	[],
	[],
]

type CarWizardProps = {
	locations: Location[]
	initialValues?: CarFormValues
}

export function CarWizard({ locations, initialValues = emptyCarValues }: CarWizardProps) {
	const router = useRouter()
	const [step, setStep] = useState(0)
	const [availableLocations, setAvailableLocations] = useState<Location[]>(locations)
	const [saving, setSaving] = useState(false)
	const form = useForm<CarFormValues>({ defaultValues: initialValues })
	const isLastStep = step === stepLabels.length - 1
	const canPublish = getPublishChecklist(form.watch()).every((item) => item.isDone)

	function handleLocationCreated(newLoc: Location) {
		setAvailableLocations((prev) => [newLoc, ...prev])
		form.setValue("locationId", newLoc.id, { shouldValidate: true })
	}

	function buildPayload(): CreateCarInput {
		const values = form.getValues()
		return {
			make: values.make.trim(),
			model: values.model.trim(),
			year: Number(values.year),
			plate: values.plate.trim(),
			category: values.category,
			color: values.color.trim() || null,
			seats: Number(values.seats || 5),
			doors: Number(values.doors || 4),
			luggage: Number(values.luggage || 2),
			transmission: values.transmission,
			fuel: values.fuel,
			mileageKm: Number(values.mileageKm || 0),
			features: values.features,
			dailyPriceMinor: values.dailyPrice ? Math.round(Number(values.dailyPrice) * 100) : 0,
			depositMinor: values.deposit ? Math.round(Number(values.deposit) * 100) : 0,
			kmPerDay: Number(values.kmPerDay || 250),
			extraKmFeeMinor: values.extraKmFee ? Math.round(Number(values.extraKmFee) * 100) : 0,
			minDays: Number(values.minDays || 1),
			homeLocationId: values.locationId || undefined,
		}
	}

	async function goNext() {
		const isValid = await form.trigger(fieldsPerStep[step])
		if (isValid) setStep(step + 1)
	}

	async function saveDraft() {
		const isValid = await form.trigger(["make", "model", "year", "plate"])
		if (!isValid) {
			toast.error("Please fill in the make, model, year, and plate before saving a draft")
			return
		}

		setSaving(true)
		try {
			const payload = buildPayload()
			const car = await createCar(payload)
			toast.success(`Car draft saved: ${car.make} ${car.model}`)
			router.push("/admin/cars")
			router.refresh()
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Failed to save car draft"
			toast.error(msg)
		} finally {
			setSaving(false)
		}
	}

	async function handlePublish() {
		setSaving(true)
		try {
			const payload = buildPayload()
			const car = await createCar(payload)
			await publishCar(car.id)
			toast.success(`Car published: ${car.make} ${car.model}`)
			router.push("/admin/cars")
			router.refresh()
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Failed to publish car"
			toast.error(msg)
		} finally {
			setSaving(false)
		}
	}

	return (
		<div className="space-y-6">
			<Card>
				<CardContent>
					<Stepper steps={stepLabels} current={step} onSelect={setStep} />
				</CardContent>
			</Card>

			<Card>
				<CardContent className="space-y-6 py-2">
					<h2 className="text-lg font-semibold">{stepLabels[step]}</h2>
					{step === 0 && (
						<BasicsStep
							form={form}
							locations={availableLocations}
							onLocationCreated={handleLocationCreated}
						/>
					)}
					{step === 1 && <SpecsStep form={form} />}
					{step === 2 && <PricingStep form={form} locations={availableLocations} />}
					{step === 3 && <MediaStep form={form} />}
					{step === 4 && <ReviewStep values={form.watch()} />}
				</CardContent>
			</Card>

			<div className="flex items-center justify-between gap-3">
				{step === 0 ? (
					<Link href="/admin/cars" className={buttonVariants({ variant: "ghost", size: "lg" })}>
						Cancel
					</Link>
				) : (
					<Button variant="outline" size="lg" onClick={() => setStep(step - 1)}>
						<ArrowLeft /> Back
					</Button>
				)}
				<div className="flex gap-2">
					<Button variant="outline" size="lg" onClick={saveDraft} disabled={saving}>
						{saving && <Loader2 className="size-4 animate-spin mr-1.5" />}
						Save draft
					</Button>
					{isLastStep ? (
						<Button size="lg" onClick={handlePublish} disabled={!canPublish || saving}>
							{saving && <Loader2 className="size-4 animate-spin mr-1.5" />}
							Publish car
						</Button>
					) : (
						<Button size="lg" onClick={goNext}>
							Continue <ArrowRight />
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}
