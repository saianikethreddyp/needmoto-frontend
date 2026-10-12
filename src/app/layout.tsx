import type { Metadata } from "next"
import { Figtree, Geist_Mono } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const figtree = Figtree({
	variable: "--font-figtree",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "Rentals Admin",
	description: "Manage cars, locations and bookings",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${figtree.variable} ${geistMono.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col">
				{children}
				<Toaster richColors />
			</body>
		</html>
	)
}
