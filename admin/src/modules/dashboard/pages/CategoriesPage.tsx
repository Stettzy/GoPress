"use client"

import { Plus, Search, Edit, Trash2, Folder, MoreVertical } from "lucide-react"
import { PageHeader } from "@/shared/components/headers/PageHeader"
import { CategoryCard } from "../components/categories/CategoryCard"
import { CategoryList } from "../components/categories/CategoryList"
import { useState } from "react"
import Link from "next/link"

export function CategoriesPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<"grid" | "list">("list")

    const categories = [
        {
            id: 1,
            name: "Technology",
            slug: "technology",
            description: "Articles about technology, programming, and software development",
            color: "#3B82F6",
            articleCount: 45,
            createdAt: "2024-01-01",
            updatedAt: "2 days ago"
        },
        {
            id: 2,
            name: "Business",
            slug: "business",
            description: "Business strategies, entrepreneurship, and market insights",
            color: "#10B981",
            articleCount: 32,
            createdAt: "2024-01-02",
            updatedAt: "1 week ago"
        },
        {
            id: 3,
            name: "Lifestyle",
            slug: "lifestyle",
            description: "Personal development, health, and lifestyle content",
            color: "#8B5CF6",
            articleCount: 28,
            createdAt: "2024-01-03",
            updatedAt: "3 days ago"
        },
        {
            id: 4,
            name: "News",
            slug: "news",
            description: "Latest news and current events",
            color: "#EF4444",
            articleCount: 67,
            createdAt: "2024-01-04",
            updatedAt: "1 day ago"
        },
        {
            id: 5,
            name: "Design",
            slug: "design",
            description: "UI/UX design, graphic design, and creative content",
            color: "#F59E0B",
            articleCount: 19,
            createdAt: "2024-01-05",
            updatedAt: "5 days ago"
        },
        {
            id: 6,
            name: "Marketing",
            slug: "marketing",
            description: "Digital marketing, SEO, and growth strategies",
            color: "#EC4899",
            articleCount: 23,
            createdAt: "2024-01-06",
            updatedAt: "4 days ago"
        }
    ]

    const filteredCategories = categories.filter(category => 
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-8">
            <PageHeader title="Categories">
                <div className="flex items-center gap-2">
                    <Link 
                        href="/admin/categories/create"
                        className="cursor-pointer flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-md hover:bg-accent/90 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        New Category
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
                            placeholder="Search categories..."
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
                        <Folder className="w-4 h-4" />
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

            {/* Categories List/Grid */}
            <CategoryList viewMode={viewMode}>
                {filteredCategories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        viewMode={viewMode}
                    />
                ))}
            </CategoryList>

            {filteredCategories.length === 0 && (
                <div className="text-center py-12">
                    <Folder className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No categories found</h3>
                    <p className="text-muted-foreground">
                        {searchQuery ? "Try adjusting your search terms" : "Create your first category to get started"}
                    </p>
                </div>
            )}
        </div>
    )
}
