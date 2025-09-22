"use client"

import { ReactNode } from "react"

interface ArticleListProps {
    children: ReactNode
    viewMode: "grid" | "list"
}

export default function ArticleList({ children, viewMode }: ArticleListProps) {
    if (viewMode === "list") {
        return (
            <div className="space-y-3">
                {children}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children}
        </div>
    )
}
