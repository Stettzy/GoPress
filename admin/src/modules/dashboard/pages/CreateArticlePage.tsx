"use client"

import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/shared/components/headers/PageHeader"
import ArticleForm from "../components/forms/ArticleForm"
import { useRouter } from "next/navigation"

export function CreateArticlePage() {
    const router = useRouter()

    const handleSubmit = (data: any) => {
        console.log("Creating article:", data)
        // Here you would typically send the data to your API
        // For now, we'll just log it and redirect back to articles
        router.push("/admin/articles")
    }

    const handleCancel = () => {
        router.push("/admin/articles")
    }

    return (
        <div className="space-y-8">
            <PageHeader title="Create Article">
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCancel}
                        className="cursor-pointer flex items-center gap-2 bg-background text-foreground px-4 py-2 rounded-md border border-border hover:bg-muted transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Articles
                    </button>
                </div>
            </PageHeader>

            <ArticleForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default CreateArticlePage
