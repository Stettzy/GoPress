"use client"

import { Plus, Search, Filter, Grid, List, Edit, Trash2, Eye, Calendar, User, Tag } from "lucide-react"
import { PageHeader } from "@/shared/components/headers/PageHeader"
import { ArticleCard } from "../components/articles/ArticleCard"
import ArticleList from "../components/articles/ArticleList"
import { useState } from "react"
import Link from "next/link"

export function ArticlesPage() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("list")
    const [searchQuery, setSearchQuery] = useState("")
    const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft" | "scheduled">("all")
    const [filterCategory, setFilterCategory] = useState<"all" | "tech" | "business" | "lifestyle" | "news">("all")

    const articles = [
        {
            id: 1,
            title: "Getting Started with WordPress Development",
            excerpt: "Learn the fundamentals of WordPress development and best practices for building custom themes and plugins.",
            status: "published",
            author: "John Doe",
            category: "tech",
            tags: ["wordpress", "development", "tutorial"],
            publishedAt: "2024-01-15",
            updatedAt: "2 hours ago",
            views: 1250,
            comments: 23,
            featuredImage: "/media/wordpress-dev.jpg"
        },
        {
            id: 2,
            title: "The Future of Web Development",
            excerpt: "Exploring emerging technologies and trends that will shape the future of web development in 2024.",
            status: "draft",
            author: "Jane Smith",
            category: "tech",
            tags: ["web development", "future", "technology"],
            publishedAt: null,
            updatedAt: "1 day ago",
            views: 0,
            comments: 0,
            featuredImage: "/media/web-dev-future.jpg"
        },
        {
            id: 3,
            title: "Building a Successful SaaS Business",
            excerpt: "Key strategies and insights for entrepreneurs looking to build and scale a software-as-a-service business.",
            status: "published",
            author: "Mike Johnson",
            category: "business",
            tags: ["saas", "business", "entrepreneurship"],
            publishedAt: "2024-01-10",
            updatedAt: "3 days ago",
            views: 2100,
            comments: 45,
            featuredImage: "/media/saas-business.jpg"
        },
        {
            id: 4,
            title: "Work-Life Balance in Remote Teams",
            excerpt: "How to maintain healthy work-life balance while working in distributed teams and remote environments.",
            status: "scheduled",
            author: "Sarah Wilson",
            category: "lifestyle",
            tags: ["remote work", "work-life balance", "productivity"],
            publishedAt: "2024-01-20",
            updatedAt: "5 days ago",
            views: 0,
            comments: 0,
            featuredImage: "/media/remote-work.jpg"
        },
        {
            id: 5,
            title: "Latest Updates in React 18",
            excerpt: "Comprehensive overview of new features and improvements introduced in React 18 and how to use them effectively.",
            status: "published",
            author: "Alex Chen",
            category: "tech",
            tags: ["react", "javascript", "frontend"],
            publishedAt: "2024-01-08",
            updatedAt: "1 week ago",
            views: 3200,
            comments: 67,
            featuredImage: "/media/react-18.jpg"
        },
        {
            id: 6,
            title: "Sustainable Business Practices",
            excerpt: "How companies can implement sustainable practices to reduce environmental impact while maintaining profitability.",
            status: "draft",
            author: "Emma Davis",
            category: "business",
            tags: ["sustainability", "business", "environment"],
            publishedAt: null,
            updatedAt: "2 weeks ago",
            views: 0,
            comments: 0,
            featuredImage: "/media/sustainable-business.jpg"
        }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case "published":
                return "bg-primary text-primary-foreground"
            case "draft":
                return "bg-muted text-muted-foreground"
            case "scheduled":
                return "bg-accent text-accent-foreground"
            default:
                return "bg-muted text-muted-foreground"
        }
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "tech":
                return "bg-blue-100 text-blue-800"
            case "business":
                return "bg-green-100 text-green-800"
            case "lifestyle":
                return "bg-purple-100 text-purple-800"
            case "news":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = filterStatus === "all" || article.status === filterStatus
        const matchesCategory = filterCategory === "all" || article.category === filterCategory
        return matchesSearch && matchesStatus && matchesCategory
    })

    return (
        <div className="space-y-8">
            <PageHeader title="Articles">
                <div className="flex items-center gap-2">
                    <Link 
                        href="/admin/articles/create"
                        className="cursor-pointer flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-md hover:bg-accent/90 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        New Article
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
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 w-64 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                    
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                        className="px-3 py-2 w-32 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="scheduled">Scheduled</option>
                    </select>

                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value as any)}
                        className="px-3 py-2 w-32 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                        <option value="all">All Categories</option>
                        <option value="tech">Technology</option>
                        <option value="business">Business</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="news">News</option>
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
                        <List className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-md transition-all ${
                            viewMode === "grid" 
                                ? "bg-accent text-accent-foreground" 
                                : "bg-background text-muted-foreground hover:bg-muted"
                        }`}
                    >
                        <Grid className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Articles List/Grid */}
            <ArticleList viewMode={viewMode}>
                {filteredArticles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        statusColor={getStatusColor(article.status)}
                        categoryColor={getCategoryColor(article.category)}
                        viewMode={viewMode}
                    />
                ))}
            </ArticleList>

            {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                    <Edit className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No articles found</h3>
                    <p className="text-muted-foreground">
                        {searchQuery ? "Try adjusting your search terms" : "Create your first article to get started"}
                    </p>
                </div>
            )}
        </div>
    )
}
