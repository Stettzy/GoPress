"use client"

import { Plus, Search, Edit, Trash2, Tag, MoreVertical } from "lucide-react"
import { PageHeader } from "@/shared/components/headers/PageHeader"
import { TagCard } from "../components/tags/TagCard"
import { TagList } from "../components/tags/TagList"
import { useState } from "react"
import Link from "next/link"

export function TagsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<"grid" | "list">("list")

    const tags = [
        {
            id: 1,
            name: "React",
            slug: "react",
            description: "JavaScript library for building user interfaces",
            color: "#61DAFB",
            articleCount: 23,
            createdAt: "2024-01-01",
            updatedAt: "2 days ago"
        },
        {
            id: 2,
            name: "JavaScript",
            slug: "javascript",
            description: "Programming language for web development",
            color: "#F7DF1E",
            articleCount: 45,
            createdAt: "2024-01-02",
            updatedAt: "1 week ago"
        },
        {
            id: 3,
            name: "TypeScript",
            slug: "typescript",
            description: "Typed superset of JavaScript",
            color: "#3178C6",
            articleCount: 18,
            createdAt: "2024-01-03",
            updatedAt: "3 days ago"
        },
        {
            id: 4,
            name: "Node.js",
            slug: "nodejs",
            description: "JavaScript runtime for server-side development",
            color: "#339933",
            articleCount: 31,
            createdAt: "2024-01-04",
            updatedAt: "1 day ago"
        },
        {
            id: 5,
            name: "CSS",
            slug: "css",
            description: "Styling language for web pages",
            color: "#1572B6",
            articleCount: 27,
            createdAt: "2024-01-05",
            updatedAt: "5 days ago"
        },
        {
            id: 6,
            name: "Python",
            slug: "python",
            description: "High-level programming language",
            color: "#3776AB",
            articleCount: 19,
            createdAt: "2024-01-06",
            updatedAt: "4 days ago"
        },
        {
            id: 7,
            name: "Web Development",
            slug: "web-development",
            description: "Building websites and web applications",
            color: "#FF6B6B",
            articleCount: 52,
            createdAt: "2024-01-07",
            updatedAt: "2 days ago"
        },
        {
            id: 8,
            name: "Design",
            slug: "design",
            description: "UI/UX and graphic design topics",
            color: "#9B59B6",
            articleCount: 15,
            createdAt: "2024-01-08",
            updatedAt: "6 days ago"
        }
    ]

    const filteredTags = tags.filter(tag => 
        tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-8">
            <PageHeader title="Tags">
                <div className="flex items-center gap-2">
                    <Link 
                        href="/admin/tags/create"
                        className="cursor-pointer flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-md hover:bg-accent/90 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        New Tag
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
                            placeholder="Search tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 w-64 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
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
                        <Tag className="w-4 h-4" />
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

            {/* Tags List/Grid */}
            <TagList viewMode={viewMode}>
                {filteredTags.map((tag) => (
                    <TagCard
                        key={tag.id}
                        tag={tag}
                        viewMode={viewMode}
                    />
                ))}
            </TagList>

            {filteredTags.length === 0 && (
                <div className="text-center py-12">
                    <Tag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No tags found</h3>
                    <p className="text-muted-foreground">
                        {searchQuery ? "Try adjusting your search terms" : "Create your first tag to get started"}
                    </p>
                </div>
            )}
        </div>
    )
}
