"use client"

import { ReactNode } from "react"

interface UserListProps {
    children: ReactNode
    viewMode: "grid" | "list"
}

export function UserList({ children, viewMode }: UserListProps) {
    if (viewMode === "list") {
        return (
            <div className="space-y-3">
                {children}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {children}
        </div>
    )
}

export default UserList

