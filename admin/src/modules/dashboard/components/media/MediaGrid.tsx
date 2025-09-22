"use client"

import { ReactNode } from "react"

interface MediaGridProps {
    children: ReactNode
    viewMode: "grid" | "list"
}

function MediaGrid({ children, viewMode }: MediaGridProps) {
    if (viewMode === "list") {
        return (
            <div className="space-y-2">
                {children}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {children}
        </div>
    )
}

export default MediaGrid
