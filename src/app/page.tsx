import { redirect } from "next/navigation"

// The customer site comes later; for now the root sends visitors to the admin panel.
export default function HomePage() {
	redirect("/admin")
}
