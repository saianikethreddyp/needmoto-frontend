import type { UseFormReturn } from "react-hook-form"
import type { CarFormValues } from "./car-form-values"
import { DocumentFields } from "./document-fields"
import { PhotoUploader } from "./photo-uploader"

export function MediaStep({ form }: { form: UseFormReturn<CarFormValues> }) {
	const { watch, setValue } = form

	return (
		<div className="space-y-8">
			<section className="space-y-3">
				<h3 className="text-sm font-medium">Photos</h3>
				<PhotoUploader photos={watch("photos")} onChange={(photos) => setValue("photos", photos)} />
			</section>
			<section className="space-y-3">
				<div>
					<h3 className="text-sm font-medium">Documents</h3>
					<p className="text-xs text-muted-foreground">
						Private. Only admins can see these. Add the expiry date so we can remind you.
					</p>
				</div>
				<DocumentFields
					documents={watch("documents")}
					onChange={(documents) => setValue("documents", documents)}
				/>
			</section>
		</div>
	)
}
