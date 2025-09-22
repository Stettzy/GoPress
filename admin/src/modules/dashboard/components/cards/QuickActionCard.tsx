"use client"

import { ReactNode } from "react"

interface QuickActionCardProps {
    children: ReactNode
    onClick?: () => void
    variant?: "primary" | "default"
}

function QuickActionCard({ children, onClick, variant = "default" }: QuickActionCardProps) {
    const baseClasses = "flex flex-col items-center justify-center p-6 rounded-lg border cursor-pointer transition-all"
    const variantClasses =  "bg-background text-foreground border-border hover:bg-muted/10"
    
    return (
        <div 
            className={`${baseClasses} ${variantClasses}`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

function ActionIcon({ children }: { children: ReactNode }) {
    return (
        <div className="w-12 h-12 flex items-center justify-center mb-3">
            {children}
        </div>
    )
}

function ActionTitle({ children }: { children: ReactNode }) {
    return (
        <h3 className="text-sm font-medium text-center">
            {children}
        </h3>
    )
}

QuickActionCard.ActionIcon = ActionIcon
QuickActionCard.ActionTitle = ActionTitle

export default QuickActionCard
