"use client"

import { ImagePlus, Star, X } from "lucide-react"
import type { ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import type { PhotoItem } from "./car-form-values"

const MAX_PHOTOS = 10

type PhotoUploaderProps = { photos: PhotoItem[]; onChange: (photos: PhotoItem[]) => void }

/** Previews files locally; direct-to-R2 upload arrives with S6. The first photo is the cover. */
export function PhotoUploader({ photos, onChange }: PhotoUploaderProps) {
	function addFiles(event: ChangeEvent<HTMLInputElement>) {
		const files = Array.from(event.target.files ?? []).slice(0, MAX_PHOTOS - photos.length)
		const added = files.map((file) => ({
			id: crypto.randomUUID(),
			name: file.name,
			previewUrl: URL.createObjectURL(file),
		}))
		onChange([...photos, ...added])
		event.target.value = ""
	}

	function remove(photo: PhotoItem) {
		URL.revokeObjectURL(photo.previewUrl)
		onChange(photos.filter((item) => item.id !== photo.id))
	}

	const makeCover = (photo: PhotoItem) =>
		onChange([photo, ...photos.filter((item) => item.id !== photo.id)])

	return (
		<div className="space-y-4">
			<label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors hover:border-primary/50 hover:bg-primary/5">
				<ImagePlus className="size-8 text-muted-foreground" />
				<span className="text-sm font-medium">Click to add photos</span>
				<span className="text-xs text-muted-foreground">
					JPEG, PNG or WebP, up to {MAX_PHOTOS} photos
				</span>
				<input
					type="file"
					accept="image/jpeg,image/png,image/webp"
					multiple
					hidden
					onChange={addFiles}
				/>
			</label>

			{photos.length > 0 && (
				<ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
					{photos.map((photo, index) => (
						<li key={photo.id} className="group relative overflow-hidden rounded-lg border">
							{/* biome-ignore lint/performance/noImgElement: local blob preview, next/image cannot optimise it */}
							<img
								src={photo.previewUrl}
								alt={photo.name}
								className="aspect-[4/3] w-full object-cover"
							/>
							{index === 0 && (
								<span className="absolute top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
									Cover
								</span>
							)}
							<div className="absolute inset-x-0 bottom-0 flex justify-end gap-1 bg-gradient-to-t from-black/60 p-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
								{index > 0 && (
									<Button
										type="button"
										size="icon-xs"
										variant="secondary"
										onClick={() => makeCover(photo)}
										aria-label="Make cover"
									>
										<Star />
									</Button>
								)}
								<Button
									type="button"
									size="icon-xs"
									variant="secondary"
									onClick={() => remove(photo)}
									aria-label="Remove photo"
								>
									<X />
								</Button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
