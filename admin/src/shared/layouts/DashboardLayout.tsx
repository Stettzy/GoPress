import { DashboardSidebar } from "../components/sidebars/DashboardSidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <DashboardSidebar />
            <div className="flex-1 p-8 bg-background text-foreground overflow-y-auto">
                {children}
            </div>
        </div>
    )
}