import { DashboardLayout } from "@/shared/layouts/DashboardLayout"

export default function DashboardRouteLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}