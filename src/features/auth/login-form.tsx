"use client"

import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "./auth-client"

export function LoginForm({ notice }: { notice?: string }) {
	const router = useRouter()
	const [error, setError] = useState(notice ?? "")
	const [isSubmitting, setIsSubmitting] = useState(false)

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setIsSubmitting(true)
		setError("")

		const form = new FormData(event.currentTarget)
		const { error: signInError } = await authClient.signIn.email({
			email: String(form.get("email")),
			password: String(form.get("password")),
		})

		if (signInError) {
			setError(
				signInError.status === 429
					? "Too many attempts. Try again in a minute."
					: "Incorrect email or password.",
			)
			setIsSubmitting(false)
			return
		}
		router.push("/admin")
		router.refresh()
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input id="email" name="email" type="email" autoComplete="email" required />
			</div>
			<div className="space-y-2">
				<Label htmlFor="password">Password</Label>
				<Input
					id="password"
					name="password"
					type="password"
					autoComplete="current-password"
					required
				/>
			</div>
			{error && <p className="text-sm text-destructive">{error}</p>}
			<Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
				{isSubmitting ? "Signing in..." : "Sign in"}
			</Button>
		</form>
	)
}
