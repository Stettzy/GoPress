import { FullScreenLayout } from "@/shared/layouts/FullScreenLayout";

export default function SetupLayout({ children }: { children: React.ReactNode }) {
    return (
        <FullScreenLayout>
            {children}
        </FullScreenLayout>
    )
}