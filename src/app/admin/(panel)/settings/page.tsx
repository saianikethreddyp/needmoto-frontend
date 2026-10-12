import { PageHeader } from "@/components/layout/page-header"
import { SettingsTabs } from "@/features/settings/settings-tabs"

export default function SettingsPage() {
	return (
		<>
			<PageHeader title="Settings" description="Business details, pricing defaults and policies." />
			<SettingsTabs />
		</>
	)
}
