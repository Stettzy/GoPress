import { FullScreenLayout } from "@/shared/layouts/FullScreenLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <FullScreenLayout>
            {children}
        </FullScreenLayout>
    )
}