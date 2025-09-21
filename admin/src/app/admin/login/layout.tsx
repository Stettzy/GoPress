import { FullScreenLayout } from "@/shared/layouts/FullScreenLayout";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <FullScreenLayout>
            {children}
        </FullScreenLayout>
    )
}