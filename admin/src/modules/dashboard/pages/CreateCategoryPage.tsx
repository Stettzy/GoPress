"use client"

import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/shared/components/headers/PageHeader"
import CategoryForm from "../components/forms/CategoryForm"
import { useRouter } from "next/navigation"

export function CreateCategoryPage() {
    const router = useRouter()

    const handleSubmit = (data: any) => {
        console.log("Creating category:", data)
        // Here you would typically send the data to your API
        // For now, we'll just log it and redirect back to categories
        router.push("/admin/categories")
    }

    const handleCancel = () => {
        router.push("/admin/categories")
    }

    return (
        <div className="space-y-8">
            <PageHeader title="Create Category">
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCancel}
                        className="cursor-pointer flex items-center gap-2 bg-background text-foreground px-4 py-2 rounded-md border border-border hover:bg-muted transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Categories
                    </button>
                </div>
            </PageHeader>

            <CategoryForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default CreateCategoryPage

