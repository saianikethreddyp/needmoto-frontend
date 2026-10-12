import type { Car } from "@rentals/shared"
import { cn } from "@/lib/utils"
import { carColorSwatch } from "./car-labels"

type CarPhotoProps = {
	car: Pick<Car, "color" | "category"> & { hue?: number; coverUrl?: string | null }
	className?: string
}

const lowBody =
	"M30 112C30 100 36 94 50 92L78 86C92 66 108 56 130 54L196 54C218 56 232 68 246 86L276 92C290 95 294 102 294 112L294 120L30 120Z"
const lowWindows =
	"M98 84C106 72 116 64 130 62L158 62L158 84ZM166 62L194 62C206 64 216 72 224 84L166 84Z"
const tallBody =
	"M30 112C30 100 36 94 50 92L70 88C76 62 92 46 116 44L214 44C238 46 250 66 256 88L278 92C290 95 294 102 294 112L294 120L30 120Z"
const tallWindows =
	"M88 86C92 66 102 54 118 52L156 52L156 86ZM164 52L210 52C226 54 236 68 242 86L164 86Z"

export function CarPhoto({ car, className }: CarPhotoProps) {
	if (car.coverUrl) {
		return (
			<div className={cn("overflow-hidden bg-muted", className)}>
				{/* biome-ignore lint/performance/noImgElement: user uploaded cover url */}
				<img src={car.coverUrl} alt="Vehicle cover" className="size-full object-cover" />
			</div>
		)
	}

	const hue = car.hue ?? 200
	const isTall = car.category === "suv" || car.category === "van"
	return (
		<div
			className={cn("overflow-hidden", className)}
			style={{
				backgroundImage: `linear-gradient(160deg, oklch(0.97 0.025 ${hue}), oklch(0.91 0.055 ${hue}))`,
			}}
		>
			<svg viewBox="0 0 320 160" className="size-full" role="img" aria-label="Car illustration">
				<ellipse cx="162" cy="126" rx="128" ry="7" fill="black" opacity="0.08" />
				<path
					d={isTall ? tallBody : lowBody}
					fill={carColorSwatch(car.color ?? "White")}
					stroke="black"
					strokeOpacity="0.12"
				/>
				<path d={isTall ? tallWindows : lowWindows} fill="white" opacity="0.65" />
				{[88, 236].map((cx) => (
					<g key={cx}>
						<circle cx={cx} cy="116" r="20" fill="#202124" />
						<circle cx={cx} cy="116" r="8.5" fill="#d7d9dc" />
					</g>
				))}
			</svg>
		</div>
	)
}
