"use client"

import { useState } from "react"
import { Save, Eye, User, Mail, Shield, UserCheck } from "lucide-react"

interface UserFormProps {
    initialData?: {
        name: string
        email: string
        role: string
        status: string
        avatar: string
        isVerified: boolean
    }
    onSubmit: (data: any) => void
    onCancel: () => void
}

export function UserForm({ initialData, onSubmit, onCancel }: UserFormProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        email: initialData?.email || "",
        role: initialData?.role || "subscriber",
        status: initialData?.status || "active",
        avatar: initialData?.avatar || "",
        isVerified: initialData?.isVerified || false
    })

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }))
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
                    {initialData ? "Edit User" : "Create New User"}
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
                        {initialData ? "Update User" : "Create User"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Name */}
                    <div>
                        <label className="label">Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Enter full name..."
                            className="input"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="label">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="Enter email address..."
                            className="input"
                            required
                        />
                    </div>

                    {/* Role and Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label">Role</label>
                            <select
                                value={formData.role}
                                onChange={(e) => handleInputChange("role", e.target.value)}
                                className="input"
                            >
                                <option value="subscriber">Subscriber</option>
                                <option value="author">Author</option>
                                <option value="editor">Editor</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => handleInputChange("status", e.target.value)}
                                className="input"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </div>

                    {/* Avatar URL */}
                    <div>
                        <label className="label">Avatar URL</label>
                        <input
                            type="url"
                            value={formData.avatar}
                            onChange={(e) => handleInputChange("avatar", e.target.value)}
                            placeholder="https://example.com/avatar.jpg"
                            className="input"
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* User Settings */}
                    <div className="card">
                        <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            User Settings
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-foreground">
                                    Verified User
                                </label>
                                <button
                                    type="button"
                                    onClick={() => handleInputChange("isVerified", !formData.isVerified)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        formData.isVerified ? 'bg-accent' : 'bg-muted'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            formData.isVerified ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="card">
                        <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            Preview
                        </h3>
                        <div className="space-y-4">
                            {/* Avatar Preview */}
                            <div className="flex justify-center">
                                <div className="relative">
                                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                                        {formData.avatar ? (
                                            <img
                                                src={formData.avatar}
                                                alt="Avatar preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement
                                                    target.style.display = 'none'
                                                    target.nextElementSibling?.classList.remove('hidden')
                                                }}
                                            />
                                        ) : null}
                                        <div className={`w-full h-full flex items-center justify-center text-muted-foreground ${formData.avatar ? "hidden" : ""}`}>
                                            <User className="w-8 h-8" />
                                        </div>
                                    </div>
                                    {formData.isVerified && (
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                            <UserCheck className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* User Info Preview */}
                            <div className="text-center">
                                <h4 className="font-medium text-foreground">{formData.name || "User Name"}</h4>
                                <p className="text-sm text-muted-foreground">{formData.email || "user@example.com"}</p>
                                <div className="flex items-center justify-center gap-2 mt-2">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        formData.role === "admin" ? "bg-red-100 text-red-800" :
                                        formData.role === "editor" ? "bg-blue-100 text-blue-800" :
                                        formData.role === "author" ? "bg-green-100 text-green-800" :
                                        "bg-gray-100 text-gray-800"
                                    }`}>
                                        {formData.role}
                                    </span>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        formData.status === "active" ? "bg-green-100 text-green-800" :
                                        formData.status === "inactive" ? "bg-gray-100 text-gray-800" :
                                        "bg-yellow-100 text-yellow-800"
                                    }`}>
                                        {formData.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default UserForm

