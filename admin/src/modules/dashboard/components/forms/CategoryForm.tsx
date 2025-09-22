"use client"

import { useState } from "react"
import { Save, Eye, Folder, Palette } from "lucide-react"

interface CategoryFormProps {
    initialData?: {
        name: string
        slug: string
        description: string
        color: string
    }
    onSubmit: (data: any) => void
    onCancel: () => void
}

const predefinedColors = [
    "#3B82F6", // Blue
    "#10B981", // Green
    "#8B5CF6", // Purple
    "#EF4444", // Red
    "#F59E0B", // Orange
    "#EC4899", // Pink
    "#06B6D4", // Cyan
    "#84CC16", // Lime
    "#F97316", // Orange
    "#6366F1", // Indigo
    "#14B8A6", // Teal
    "#A855F7"  // Violet
]

export function CategoryForm({ initialData, onSubmit, onCancel }: CategoryFormProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        description: initialData?.description || "",
        color: initialData?.color || "#3B82F6"
    })

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        
        // Auto-generate slug from name
        if (field === "name" && !initialData) {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim()
            setFormData(prev => ({ ...prev, slug }))
        }
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
                    {initialData ? "Edit Category" : "Create New Category"}
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
                        type="submit"
                        className="btn btn-accent"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {initialData ? "Update Category" : "Create Category"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Name */}
                    <div>
                        <label className="label">Category Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Enter category name..."
                            className="input"
                            required
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="label">Slug</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => handleInputChange("slug", e.target.value)}
                            placeholder="category-slug"
                            className="input"
                            required
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                            URL-friendly version of the name. Used in URLs and permalinks.
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="label">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            placeholder="Brief description of this category..."
                            className="input min-h-[100px] resize-none"
                            rows={4}
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Color Selection */}
                    <div className="card">
                        <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                            <Palette className="w-4 h-4" />
                            Category Color
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div 
                                    className="w-8 h-8 rounded-lg border-2 border-border"
                                    style={{ backgroundColor: formData.color }}
                                />
                                <input
                                    type="text"
                                    value={formData.color}
                                    onChange={(e) => handleInputChange("color", e.target.value)}
                                    placeholder="#3B82F6"
                                    className="input flex-1"
                                />
                            </div>
                            
                            <div className="grid grid-cols-6 gap-2">
                                {predefinedColors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => handleInputChange("color", color)}
                                        className={`w-8 h-8 rounded-lg border-2 transition-all ${
                                            formData.color === color 
                                                ? "border-foreground scale-110" 
                                                : "border-border hover:scale-105"
                                        }`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="card">
                        <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Preview
                        </h3>
                        <div className="space-y-3">
                            <div 
                                className="h-16 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: formData.color + "10" }}
                            >
                                <div 
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: formData.color + "20" }}
                                >
                                    <Folder 
                                        className="w-4 h-4" 
                                        style={{ color: formData.color }}
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="font-medium text-foreground">{formData.name || "Category Name"}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {formData.slug ? `/${formData.slug}` : "/category-slug"}
                                </p>
                                {formData.description && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {formData.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CategoryForm

