import type { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import type { LocationFormValues } from "./location-form-values"
import { weekdayNames } from "./weekdays"

type Props = {
	register: UseFormRegister<LocationFormValues>
	watch: UseFormWatch<LocationFormValues>
	setValue: UseFormSetValue<LocationFormValues>
	error?: string
}

export function OpeningHoursFields({ register, watch, setValue, error }: Props) {
	return (
		<div className="space-y-2">
			{weekdayNames.map((dayName, index) => {
				const isClosed = watch(`hours.${index}.isClosed`)
				return (
					<div key={dayName} className="flex items-center gap-4 rounded-lg border p-3">
						<span className="w-24 text-sm font-medium">{dayName}</span>
						<Switch
							checked={!isClosed}
							onCheckedChange={(open) => setValue(`hours.${index}.isClosed`, !open)}
						/>
						{isClosed ? (
							<span className="text-sm text-muted-foreground">Closed</span>
						) : (
							<div className="flex items-center gap-2">
								<Input type="time" className="w-32" {...register(`hours.${index}.opensAt`)} />
								<span className="text-sm text-muted-foreground">to</span>
								<Input type="time" className="w-32" {...register(`hours.${index}.closesAt`)} />
							</div>
						)}
					</div>
				)
			})}
			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	)
}
