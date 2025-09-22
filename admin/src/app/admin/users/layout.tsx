import { DashboardLayout } from "@/shared/layouts/DashboardLayout"

export default function UsersRouteLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    )
}

