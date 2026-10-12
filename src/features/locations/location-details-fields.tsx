import type { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { FormField } from "@/components/forms/form-field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import type { LocationFormValues } from "./location-form-values"

type Props = {
	register: UseFormRegister<LocationFormValues>
	errors: FieldErrors<LocationFormValues>
	watch: UseFormWatch<LocationFormValues>
	setValue: UseFormSetValue<LocationFormValues>
	showActiveToggle: boolean
}

const textFields = [
	{ name: "name", label: "Location name", placeholder: "Hyderabad Airport" },
	{ name: "addressLine", label: "Address", placeholder: "Terminal Road" },
	{ name: "city", label: "City", placeholder: "Hyderabad" },
	{ name: "state", label: "State / region", placeholder: "Telangana" },
	{ name: "country", label: "Country", placeholder: "India" },
	{ name: "phone", label: "Phone (optional)", placeholder: "+91 98765 43210" },
	{ name: "latitude", label: "Latitude (optional)", placeholder: "17.2403" },
	{ name: "longitude", label: "Longitude (optional)", placeholder: "78.4294" },
] as const

const toggles = [
	{ name: "isHub", label: "Primary Hub (major depot / stationing point for multiple cars)" },
	{ name: "allowsPickup", label: "Customers can pick up cars here" },
	{ name: "allowsDropoff", label: "Customers can return cars here" },
	{ name: "isAirport", label: "This is an airport location" },
] as const

const timezones = Intl.supportedValuesOf("timeZone")

export function LocationDetailsFields({
	register,
	errors,
	watch,
	setValue,
	showActiveToggle,
}: Props) {
	const switches = showActiveToggle
		? [...toggles, { name: "isActive", label: "Location is active" } as const]
		: toggles

	return (
		<div className="space-y-6">
			<div className="grid gap-5 sm:grid-cols-2">
				{textFields.map(({ name, label, placeholder }) => (
					<FormField key={name} label={label} htmlFor={name} error={errors[name]?.message}>
						<Input id={name} placeholder={placeholder} {...register(name)} />
					</FormField>
				))}
				<FormField label="Timezone" htmlFor="timezone" error={errors.timezone?.message}>
					<Input
						id="timezone"
						list="timezone-options"
						placeholder="Asia/Kolkata"
						{...register("timezone")}
					/>
					<datalist id="timezone-options">
						{timezones.map((zone) => (
							<option key={zone} value={zone} />
						))}
					</datalist>
				</FormField>
			</div>

			<div className="space-y-3">
				{switches.map(({ name, label }) => (
					<div
						key={name}
						className="flex items-center justify-between rounded-lg border p-3 text-sm"
					>
						{label}
						<Switch
							aria-label={label}
							checked={watch(name)}
							onCheckedChange={(checked) => setValue(name, checked)}
						/>
					</div>
				))}
			</div>
		</div>
	)
}
