"use client"

import { Edit, Trash2, User, Mail, Calendar, Shield, UserCheck, FileText, Clock } from "lucide-react"
import { useState } from "react"

interface User {
    id: number
    name: string
    email: string
    role: string
    status: string
    avatar: string
    lastLogin: string
    createdAt: string
    articleCount: number
    isVerified: boolean
}

interface UserCardProps {
    user: User
    roleColor: string
    statusColor: string
    viewMode: "grid" | "list"
}

export function UserCard({ user, roleColor, statusColor, viewMode }: UserCardProps) {
    const [showActions, setShowActions] = useState(false)

    if (viewMode === "list") {
        return (
            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.style.display = 'none'
                                        target.nextElementSibling?.classList.remove('hidden')
                                    }}
                                />
                            ) : null}
                            <div className={`w-full h-full flex items-center justify-center text-muted-foreground ${user.avatar ? "hidden" : ""}`}>
                                <User className="w-6 h-6" />
                            </div>
                        </div>
                        {user.isVerified && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                <UserCheck className="w-2 h-2 text-white" />
                            </div>
                        )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-foreground">{user.name}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${roleColor}`}>
                                {user.role}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor}`}>
                                {user.status}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                            <Mail className="w-3 h-3" />
                            {user.email}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                {user.articleCount} articles
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {user.lastLogin}
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Joined {user.createdAt}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-md transition-colors">
                        <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-md transition-colors">
                        <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="relative group bg-background border border-border rounded-lg overflow-hidden hover:shadow-md transition-all">
            {/* User Header */}
            <div className="p-6 text-center">
                <div className="relative inline-block mb-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center overflow-hidden mx-auto">
                        {user.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.style.display = 'none'
                                    target.nextElementSibling?.classList.remove('hidden')
                                }}
                            />
                        ) : null}
                        <div className={`w-full h-full flex items-center justify-center text-muted-foreground ${user.avatar ? "hidden" : ""}`}>
                            <User className="w-8 h-8" />
                        </div>
                    </div>
                    {user.isVerified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <UserCheck className="w-3 h-3 text-white" />
                        </div>
                    )}
                </div>

                <h3 className="font-medium text-foreground mb-1">{user.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{user.email}</p>
                
                <div className="flex items-center justify-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${roleColor}`}>
                        {user.role}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor}`}>
                        {user.status}
                    </span>
                </div>
            </div>

            {/* User Stats */}
            <div className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <div className="text-lg font-semibold text-foreground">{user.articleCount}</div>
                        <div className="text-xs text-muted-foreground">Articles</div>
                    </div>
                    <div>
                        <div className="text-lg font-semibold text-foreground">{user.lastLogin}</div>
                        <div className="text-xs text-muted-foreground">Last Login</div>
                    </div>
                </div>
            </div>

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors">
                    <Edit className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors">
                    <Trash2 className="w-4 h-4 text-white" />
                </button>
            </div>
        </div>
    )
}

export default UserCard

