import { DashboardLayout } from "@/shared/layouts/DashboardLayout"

export default function ArticlesRouteLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}
