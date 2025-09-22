"use client"

import { Edit, Trash2, Folder, Calendar, FileText } from "lucide-react"
import { useState } from "react"

interface Category {
    id: number
    name: string
    slug: string
    description: string
    color: string
    articleCount: number
    createdAt: string
    updatedAt: string
}

interface CategoryCardProps {
    category: Category
    viewMode: "grid" | "list"
}

export function CategoryCard({ category, viewMode }: CategoryCardProps) {
    const [showActions, setShowActions] = useState(false)

    if (viewMode === "list") {
        return (
            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                    {/* Category Icon */}
                    <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: category.color + "20" }}
                    >
                        <Folder 
                            className="w-6 h-6" 
                            style={{ color: category.color }}
                        />
                    </div>

                    {/* Category Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-foreground">{category.name}</h3>
                            <span 
                                className="px-2 py-1 rounded text-xs font-medium"
                                style={{ 
                                    backgroundColor: category.color + "20", 
                                    color: category.color 
                                }}
                            >
                                {category.slug}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {category.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                {category.articleCount} articles
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Updated {category.updatedAt}
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
            {/* Category Header */}
            <div 
                className="h-20 flex items-center justify-center"
                style={{ backgroundColor: category.color + "10" }}
            >
                <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: category.color + "20" }}
                >
                    <Folder 
                        className="w-6 h-6" 
                        style={{ color: category.color }}
                    />
                </div>
            </div>

            {/* Category Info */}
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground">{category.name}</h3>
                    <span 
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ 
                            backgroundColor: category.color + "20", 
                            color: category.color 
                        }}
                    >
                        {category.slug}
                    </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {category.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {category.articleCount} articles
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {category.updatedAt}
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

export default CategoryCard
