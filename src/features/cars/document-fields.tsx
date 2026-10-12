"use client"

import { FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { type CarFormValues, type DocumentType, documentTypes } from "./car-form-values"

type DocumentFieldsProps = {
	documents: CarFormValues["documents"]
	onChange: (documents: CarFormValues["documents"]) => void
}

export function DocumentFields({ documents, onChange }: DocumentFieldsProps) {
	const update = (type: DocumentType, patch: { fileName?: string; expiresOn?: string }) =>
		onChange({
			...documents,
			[type]: { fileName: "", expiresOn: "", ...documents[type], ...patch },
		})

	return (
		<ul className="divide-y rounded-xl border">
			{documentTypes.map((type) => {
				const value = documents[type]
				return (
					<li key={type} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
						<div className="flex flex-1 items-center gap-3">
							<span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
								<FileText className="size-4" />
							</span>
							<div className="min-w-0">
								<p className="text-sm font-medium">{type}</p>
								<p className="truncate text-xs text-muted-foreground">
									{value?.fileName || "No file chosen"}
								</p>
							</div>
						</div>
						<label className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm hover:bg-muted">
							Choose file
							<input
								type="file"
								accept="application/pdf,image/*"
								hidden
								onChange={(event) =>
									update(type, { fileName: event.target.files?.[0]?.name ?? "" })
								}
							/>
						</label>
						<Input
							type="date"
							aria-label={`${type} expiry date`}
							value={value?.expiresOn ?? ""}
							onChange={(event) => update(type, { expiresOn: event.target.value })}
							className="sm:w-40"
						/>
					</li>
				)
			})}
		</ul>
	)
}
