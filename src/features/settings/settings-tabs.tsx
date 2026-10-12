"use client"

import { toast } from "sonner"
import { FormField } from "@/components/forms/form-field"
import { NativeSelect } from "@/components/forms/native-select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

function SettingsCard({
	title,
	description,
	children,
}: {
	title: string
	description: string
	children: React.ReactNode
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-5">
				{children}
				<Button onClick={() => toast.info("Preview only: saving settings arrives in S10.")}>
					Save changes
				</Button>
			</CardContent>
		</Card>
	)
}

function ToggleRow({
	label,
	hint,
	defaultChecked,
}: {
	label: string
	hint: string
	defaultChecked?: boolean
}) {
	return (
		<div className="flex items-center justify-between gap-4">
			<div>
				<p className="text-sm font-medium">{label}</p>
				<p className="text-xs text-muted-foreground">{hint}</p>
			</div>
			<Switch defaultChecked={defaultChecked} aria-label={label} />
		</div>
	)
}

export function SettingsTabs() {
	return (
		<Tabs defaultValue="business">
			<TabsList variant="line" className="max-w-full overflow-x-auto">
				<TabsTrigger value="business" className="px-3">
					Business
				</TabsTrigger>
				<TabsTrigger value="pricing" className="px-3">
					Pricing &amp; tax
				</TabsTrigger>
				<TabsTrigger value="policies" className="px-3">
					Policies
				</TabsTrigger>
				<TabsTrigger value="notifications" className="px-3">
					Notifications
				</TabsTrigger>
			</TabsList>

			<TabsContent value="business" className="pt-4">
				<SettingsCard title="Business details" description="Shown on invoices and customer emails.">
					<div className="grid gap-5 sm:grid-cols-2">
						<FormField label="Business name" htmlFor="biz-name">
							<Input id="biz-name" placeholder="Rentals Hyderabad" />
						</FormField>
						<FormField label="Support email" htmlFor="biz-email">
							<Input id="biz-email" type="email" placeholder="hello@example.com" />
						</FormField>
						<FormField label="Support phone" htmlFor="biz-phone">
							<Input id="biz-phone" placeholder="+91 98000 00000" />
						</FormField>
						<FormField label="Currency" htmlFor="biz-currency">
							<NativeSelect id="biz-currency" defaultValue="INR">
								<option value="INR">Indian rupee (₹)</option>
							</NativeSelect>
						</FormField>
					</div>
				</SettingsCard>
			</TabsContent>

			<TabsContent value="pricing" className="pt-4">
				<SettingsCard
					title="Pricing and tax"
					description="Defaults applied to every new car and booking."
				>
					<div className="grid gap-5 sm:grid-cols-2">
						<FormField label="Tax rate (%)" htmlFor="tax">
							<Input id="tax" type="number" defaultValue="18" />
						</FormField>
						<FormField label="Default deposit (₹)" htmlFor="deposit-default">
							<Input id="deposit-default" type="number" defaultValue="10000" />
						</FormField>
						<FormField label="Minimum driver age" htmlFor="min-age">
							<Input id="min-age" type="number" defaultValue="21" />
						</FormField>
						<FormField label="Buffer between rentals (minutes)" htmlFor="buffer">
							<Input id="buffer" type="number" defaultValue="60" />
						</FormField>
					</div>
				</SettingsCard>
			</TabsContent>

			<TabsContent value="policies" className="pt-4">
				<SettingsCard title="Booking policies" description="Rules customers agree to at checkout.">
					<ToggleRow
						label="Approve bookings manually"
						hint="Off confirms bookings automatically after payment."
						defaultChecked
					/>
					<ToggleRow label="Allow pay at pickup" hint="Holds the car without online payment." />
					<FormField label="Free cancellation until (hours before pickup)" htmlFor="cancel-hours">
						<Input id="cancel-hours" type="number" defaultValue="24" className="sm:w-40" />
					</FormField>
					<FormField label="Terms shown at checkout" htmlFor="terms">
						<Textarea id="terms" rows={4} placeholder="Fuel policy, damage, late returns…" />
					</FormField>
				</SettingsCard>
			</TabsContent>

			<TabsContent value="notifications" className="pt-4">
				<SettingsCard
					title="Email notifications"
					description="What you and your customers get emailed about."
				>
					<ToggleRow
						label="New booking received"
						hint="Email me when a customer books."
						defaultChecked
					/>
					<ToggleRow
						label="Document expiring"
						hint="Remind me 30 days before insurance or inspection expires."
						defaultChecked
					/>
					<ToggleRow
						label="Pickup reminder to customer"
						hint="Sent 24 hours before pickup."
						defaultChecked
					/>
				</SettingsCard>
			</TabsContent>
		</Tabs>
	)
}
