"use client"

import { Upload, Image, FileText, Video, Music, Archive, Search, Filter, Grid, List } from "lucide-react"
import { PageHeader } from "@/shared/components/headers/PageHeader"
import MediaUpload  from "../components/forms/MediaUpload"
import MediaGrid from "../components/media/MediaGrid"
import MediaCard from "../components/cards/MediaCard"
import { useState } from "react"

export function MediaPage() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [searchQuery, setSearchQuery] = useState("")
    const [filterType, setFilterType] = useState<"all" | "image" | "video" | "audio" | "document">("all")

    const mediaFiles = [
        {
            id: 1,
            name: "hero-image.jpg",
            type: "image",
            size: "2.4 MB",
            uploadedAt: "2 hours ago",
            url: "/media/hero-image.jpg",
            thumbnail: "/media/thumbnails/hero-image.jpg"
        },
        {
            id: 2,
            name: "product-demo.mp4",
            type: "video",
            size: "15.2 MB",
            uploadedAt: "1 day ago",
            url: "/media/product-demo.mp4",
            thumbnail: "/media/thumbnails/product-demo.jpg"
        },
        {
            id: 3,
            name: "background-music.mp3",
            type: "audio",
            size: "4.1 MB",
            uploadedAt: "3 days ago",
            url: "/media/background-music.mp3",
            thumbnail: "/media/thumbnails/audio-placeholder.jpg"
        },
        {
            id: 4,
            name: "user-manual.pdf",
            type: "document",
            size: "1.8 MB",
            uploadedAt: "1 week ago",
            url: "/media/user-manual.pdf",
            thumbnail: "/media/thumbnails/pdf-placeholder.jpg"
        },
        {
            id: 5,
            name: "gallery-photo-1.jpg",
            type: "image",
            size: "3.2 MB",
            uploadedAt: "2 weeks ago",
            url: "/media/gallery-photo-1.jpg",
            thumbnail: "/media/thumbnails/gallery-photo-1.jpg"
        },
        {
            id: 6,
            name: "presentation.pptx",
            type: "document",
            size: "8.7 MB",
            uploadedAt: "3 weeks ago",
            url: "/media/presentation.pptx",
            thumbnail: "/media/thumbnails/ppt-placeholder.jpg"
        }
    ]

    const getFileIcon = (type: string) => {
        switch (type) {
            case "image":
                return <Image className="w-5 h-5" />
            case "video":
                return <Video className="w-5 h-5" />
            case "audio":
                return <Music className="w-5 h-5" />
            case "document":
                return <FileText className="w-5 h-5" />
            default:
                return <Archive className="w-5 h-5" />
        }
    }

    const filteredMedia = mediaFiles.filter(file => {
        const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = filterType === "all" || file.type === filterType
        return matchesSearch && matchesFilter
    })

    return (
        <div className="space-y-8">
            <PageHeader title="Media Library">
                <div className="flex items-center gap-2">
                    <button className="cursor-pointer flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-md hover:bg-accent/90 transition-all">
                        <Upload className="w-4 h-4" />
                        Upload Media
                    </button>
                </div>
            </PageHeader>

            {/* Upload Section */}
            <MediaUpload />

            {/* Search and Filter Controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search media..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 w-64 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                    
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value as any)}
                        className="px-3 py-2 w-32 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                        <option value="all">All Types</option>
                        <option value="image">Images</option>
                        <option value="video">Videos</option>
                        <option value="audio">Audio</option>
                        <option value="document">Documents</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
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
                </div>
            </div>

            {/* Media Grid/List */}
            <MediaGrid viewMode={viewMode}>
                {filteredMedia.map((file) => (
                    <MediaCard
                        key={file.id}
                        file={file}
                        icon={getFileIcon(file.type)}
                        viewMode={viewMode}
                    />
                ))}
            </MediaGrid>

            {filteredMedia.length === 0 && (
                <div className="text-center py-12">
                    <Archive className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No media found</h3>
                    <p className="text-muted-foreground">
                        {searchQuery ? "Try adjusting your search terms" : "Upload your first media file to get started"}
                    </p>
                </div>
            )}
        </div>
    )
}
