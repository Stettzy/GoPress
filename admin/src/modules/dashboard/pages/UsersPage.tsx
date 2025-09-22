"use client"

import { Plus, Search, Edit, Trash2, User, MoreVertical, Mail, Calendar, Shield, UserCheck } from "lucide-react"
import { PageHeader } from "@/shared/components/headers/PageHeader"
import { UserCard } from "../components/users/UserCard"
import { UserList } from "../components/users/UserList"
import { useState } from "react"
import Link from "next/link"

export function UsersPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<"grid" | "list">("list")
    const [filterRole, setFilterRole] = useState<"all" | "admin" | "editor" | "author" | "subscriber">("all")
    const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "pending">("all")

    const users = [
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            role: "admin",
            status: "active",
            avatar: "/avatars/john-doe.jpg",
            lastLogin: "2 hours ago",
            createdAt: "2024-01-01",
            articleCount: 45,
            isVerified: true
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            role: "editor",
            status: "active",
            avatar: "/avatars/jane-smith.jpg",
            lastLogin: "1 day ago",
            createdAt: "2024-01-02",
            articleCount: 32,
            isVerified: true
        },
        {
            id: 3,
            name: "Mike Johnson",
            email: "mike.johnson@example.com",
            role: "author",
            status: "active",
            avatar: "/avatars/mike-johnson.jpg",
            lastLogin: "3 days ago",
            createdAt: "2024-01-03",
            articleCount: 18,
            isVerified: false
        },
        {
            id: 4,
            name: "Sarah Wilson",
            email: "sarah.wilson@example.com",
            role: "author",
            status: "inactive",
            avatar: "/avatars/sarah-wilson.jpg",
            lastLogin: "2 weeks ago",
            createdAt: "2024-01-04",
            articleCount: 12,
            isVerified: true
        },
        {
            id: 5,
            name: "Alex Chen",
            email: "alex.chen@example.com",
            role: "subscriber",
            status: "pending",
            avatar: "/avatars/alex-chen.jpg",
            lastLogin: "Never",
            createdAt: "2024-01-05",
            articleCount: 0,
            isVerified: false
        },
        {
            id: 6,
            name: "Emma Davis",
            email: "emma.davis@example.com",
            role: "editor",
            status: "active",
            avatar: "/avatars/emma-davis.jpg",
            lastLogin: "5 days ago",
            createdAt: "2024-01-06",
            articleCount: 28,
            isVerified: true
        }
    ]

    const getRoleColor = (role: string) => {
        switch (role) {
            case "admin":
                return "bg-red-100 text-red-800"
            case "editor":
                return "bg-blue-100 text-blue-800"
            case "author":
                return "bg-green-100 text-green-800"
            case "subscriber":
                return "bg-gray-100 text-gray-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800"
            case "inactive":
                return "bg-gray-100 text-gray-800"
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesRole = filterRole === "all" || user.role === filterRole
        const matchesStatus = filterStatus === "all" || user.status === filterStatus
        return matchesSearch && matchesRole && matchesStatus
    })

    return (
        <div className="space-y-8">
            <PageHeader title="Users">
                <div className="flex items-center gap-2">
                    <Link 
                        href="/admin/users/create"
                        className="cursor-pointer flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-md hover:bg-accent/90 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        New User
                    </Link>
                </div>
            </PageHeader>

            {/* Search and Filter Controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 w-64 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                    
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value as any)}
                        className="px-3 py-2 w-32 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="author">Author</option>
                        <option value="subscriber">Subscriber</option>
                    </select>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="px-3 py-2 w-32 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-md transition-all ${
                            viewMode === "list" 
                                ? "bg-accent text-accent-foreground" 
                                : "bg-background text-muted-foreground hover:bg-muted"
                        }`}
                    >
                        <User className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-md transition-all ${
                            viewMode === "grid" 
                                ? "bg-accent text-accent-foreground" 
                                : "bg-background text-muted-foreground hover:bg-muted"
                        }`}
                    >
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Users List/Grid */}
            <UserList viewMode={viewMode}>
                {filteredUsers.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        roleColor={getRoleColor(user.role)}
                        statusColor={getStatusColor(user.status)}
                        viewMode={viewMode}
                    />
                ))}
            </UserList>

            {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                    <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
                    <p className="text-muted-foreground">
                        {searchQuery ? "Try adjusting your search terms" : "Create your first user to get started"}
                    </p>
                </div>
            )}
        </div>
    )
}

