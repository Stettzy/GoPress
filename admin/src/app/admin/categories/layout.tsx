import { DashboardLayout } from "@/shared/layouts/DashboardLayout"

export default function CategoriesRouteLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}
