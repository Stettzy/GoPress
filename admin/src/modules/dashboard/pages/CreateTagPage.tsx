"use client"

import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/shared/components/headers/PageHeader"
import TagForm from "../components/forms/TagForm"
import { useRouter } from "next/navigation"

export function CreateTagPage() {
    const router = useRouter()

    const handleSubmit = (data: any) => {
        console.log("Creating tag:", data)
        router.push("/admin/tags")
    }

    const handleCancel = () => {
        router.push("/admin/tags")
    }

    return (
        <div className="space-y-8">
            <PageHeader title="Create Tag">
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCancel}
                        className="cursor-pointer flex items-center gap-2 bg-background text-foreground px-4 py-2 rounded-md border border-border hover:bg-muted transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Tags
                    </button>
                </div>
            </PageHeader>

            <TagForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default CreateTagPage
