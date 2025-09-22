import { DashboardLayout } from "@/shared/layouts/DashboardLayout"

export default function SettingsRouteLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}
