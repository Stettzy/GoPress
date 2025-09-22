"use client"

import { MoreVertical, Edit, Trash2, Eye, Calendar, User, Tag, MessageCircle, EyeIcon } from "lucide-react"
import { useState } from "react"

interface Article {
    id: number
    title: string
    excerpt: string
    status: string
    author: string
    category: string
    tags: string[]
    publishedAt: string | null
    updatedAt: string
    views: number
    comments: number
    featuredImage: string
}

interface ArticleCardProps {
    article: Article
    statusColor: string
    categoryColor: string
    viewMode: "grid" | "list"
}

export function ArticleCard({ article, statusColor, categoryColor, viewMode }: ArticleCardProps) {
    const [showActions, setShowActions] = useState(false)

    if (viewMode === "list") {
        return (
            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                    {/* Featured Image */}
                    <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                        {article.featuredImage ? (
                            <img
                                src={article.featuredImage}
                                alt={article.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.style.display = 'none'
                                    target.nextElementSibling?.classList.remove('hidden')
                                }}
                            />
                        ) : null}
                        <div className={`w-full h-full flex items-center justify-center text-muted-foreground ${article.featuredImage ? "hidden" : ""}`}>
                            <Edit className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Article Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-foreground truncate">{article.title}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor}`}>
                                {article.status}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {article.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {article.author}
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {article.updatedAt}
                            </div>
                            <div className="flex items-center gap-1">
                                <EyeIcon className="w-3 h-3" />
                                {article.views}
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                {article.comments}
                            </div>
                        </div>
                    </div>

                    {/* Category Badge */}
                    <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColor}`}>
                            {article.category}
                        </span>
                    </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-md transition-colors">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
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
            {/* Featured Image */}
            <div className="aspect-video bg-muted flex items-center justify-center">
                {article.featuredImage ? (
                    <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            target.nextElementSibling?.classList.remove('hidden')
                        }}
                    />
                ) : null}
                <div className={`w-full h-full flex items-center justify-center text-muted-foreground ${article.featuredImage ? "hidden" : ""}`}>
                    <Edit className="w-8 h-8" />
                </div>
            </div>

            {/* Article Info */}
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor}`}>
                        {article.status}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${categoryColor}`}>
                        {article.category}
                    </span>
                </div>
                
                <h3 className="font-medium text-foreground mb-2 line-clamp-2">
                    {article.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {article.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                    {article.tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                        >
                            #{tag}
                        </span>
                    ))}
                    {article.tags.length > 3 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                            +{article.tags.length - 3}
                        </span>
                    )}
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {article.author}
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {article.updatedAt}
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <EyeIcon className="w-3 h-3" />
                            {article.views}
                        </div>
                        <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {article.comments}
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors">
                    <Eye className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors">
                    <Edit className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors">
                    <Trash2 className="w-4 h-4 text-white" />
                </button>
            </div>

            {/* More Actions Menu */}
            <div className="absolute top-2 right-2">
                <button
                    onClick={() => setShowActions(!showActions)}
                    className="p-1 bg-black/50 hover:bg-black/70 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                >
                    <MoreVertical className="w-4 h-4 text-white" />
                </button>
            </div>
        </div>
    )
}
