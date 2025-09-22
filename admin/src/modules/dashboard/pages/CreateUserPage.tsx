"use client"

import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/shared/components/headers/PageHeader"
import UserForm from "../components/forms/UserForm"
import { useRouter } from "next/navigation"

export function CreateUserPage() {
    const router = useRouter()

    const handleSubmit = (data: any) => {
        console.log("Creating user:", data)
        // Here you would typically send the data to your API
        // For now, we'll just log it and redirect back to users
        router.push("/admin/users")
    }

    const handleCancel = () => {
        router.push("/admin/users")
    }

    return (
        <div className="space-y-8">
            <PageHeader title="Create User">
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCancel}
                        className="cursor-pointer flex items-center gap-2 bg-background text-foreground px-4 py-2 rounded-md border border-border hover:bg-muted transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Users
                    </button>
                </div>
            </PageHeader>

            <UserForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default CreateUserPage

