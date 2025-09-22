"use client"

import { useState } from "react"
import { Save, Eye, Calendar, Tag, Image, X } from "lucide-react"

interface ArticleFormProps {
    initialData?: {
        title: string
        excerpt: string
        content: string
        status: string
        category: string
        tags: string[]
        featuredImage: string
        publishedAt: string
    }
    onSubmit: (data: any) => void
    onCancel: () => void
}

export function ArticleForm({ initialData, onSubmit, onCancel }: ArticleFormProps) {
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        excerpt: initialData?.excerpt || "",
        content: initialData?.content || "",
        status: initialData?.status || "draft",
        category: initialData?.category || "tech",
        tags: initialData?.tags || [],
        featuredImage: initialData?.featuredImage || "",
        publishedAt: initialData?.publishedAt || ""
    })

    const [newTag, setNewTag] = useState("")

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleAddTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }))
            setNewTag("")
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                    {initialData ? "Edit Article" : "Create New Article"}
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn btn-outline"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-muted"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                    </button>
                    <button
                        type="submit"
                        className="btn btn-accent"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {initialData ? "Update Article" : "Create Article"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="label">Article Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            placeholder="Enter article title..."
                            className="input"
                            required
                        />
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="label">Excerpt</label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => handleInputChange("excerpt", e.target.value)}
                            placeholder="Brief description of the article..."
                            className="input min-h-[100px] resize-none"
                            rows={4}
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="label">Content</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => handleInputChange("content", e.target.value)}
                            placeholder="Write your article content here..."
                            className="input min-h-[400px] resize-none"
                            rows={20}
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Publish Settings */}
                    <div className="card">
                        <h3 className="font-medium text-foreground mb-4">Publish Settings</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="label">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => handleInputChange("status", e.target.value)}
                                    className="input"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="scheduled">Scheduled</option>
                                </select>
                            </div>

                            <div>
                                <label className="label">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleInputChange("category", e.target.value)}
                                    className="input"
                                >
                                    <option value="tech">Technology</option>
                                    <option value="business">Business</option>
                                    <option value="lifestyle">Lifestyle</option>
                                    <option value="news">News</option>
                                </select>
                            </div>

                            {formData.status === "scheduled" && (
                                <div>
                                    <label className="label">Publish Date</label>
                                    <input
                                        type="datetime-local"
                                        value={formData.publishedAt}
                                        onChange={(e) => handleInputChange("publishedAt", e.target.value)}
                                        className="input"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="card">
                        <h3 className="font-medium text-foreground mb-4">Featured Image</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="label">Image URL</label>
                                <input
                                    type="url"
                                    value={formData.featuredImage}
                                    onChange={(e) => handleInputChange("featuredImage", e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="input"
                                />
                            </div>
                            
                            {formData.featuredImage && (
                                <div className="aspect-video bg-muted rounded-md overflow-hidden">
                                    <img
                                        src={formData.featuredImage}
                                        alt="Featured image preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement
                                            target.style.display = 'none'
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="card">
                        <h3 className="font-medium text-foreground mb-4">Tags</h3>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="Add a tag..."
                                    className="input flex-1"
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    className="btn btn-outline"
                                >
                                    Add
                                </button>
                            </div>
                            
                            {formData.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground text-sm rounded"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className="hover:text-foreground"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ArticleForm
