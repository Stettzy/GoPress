import { DashboardLayout } from "@/shared/layouts/DashboardLayout"

export default function TagsRouteLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}
