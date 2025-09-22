import { DashboardLayout } from "@/shared/layouts/DashboardLayout"

export default function MediaRouteLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}
