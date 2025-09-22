"use client"

import { MoreVertical, Download, Edit, Trash2, Eye } from "lucide-react"
import { useState } from "react"

interface MediaFile {
    id: number
    name: string
    type: string
    size: string
    uploadedAt: string
    url: string
    thumbnail: string
}

interface MediaCardProps {
    file: MediaFile
    icon: React.ReactNode
    viewMode: "grid" | "list"
}

function MediaCard({ file, icon, viewMode }: MediaCardProps) {
    const [showActions, setShowActions] = useState(false)

    if (viewMode === "list") {
        return (
            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                        {icon}
                    </div>
                    <div className="flex-1">
                        <h4 className="font-medium text-foreground">{file.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{file.size}</span>
                            <span>•</span>
                            <span>{file.uploadedAt}</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-md transition-colors">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-md transition-colors">
                        <Download className="w-4 h-4 text-muted-foreground" />
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
            {/* Thumbnail/Preview */}
            <div className="aspect-square bg-muted flex items-center justify-center">
                {file.type === "image" ? (
                    <img
                        src={file.thumbnail}
                        alt={file.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            target.nextElementSibling?.classList.remove('hidden')
                        }}
                    />
                ) : null}
                <div className={`w-full h-full flex items-center justify-center ${file.type === "image" ? "hidden" : ""}`}>
                    <div className="text-muted-foreground">
                        {icon}
                    </div>
                </div>
            </div>

            {/* File Info */}
            <div className="p-3">
                <h4 className="font-medium text-foreground text-sm truncate mb-1">
                    {file.name}
                </h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{file.size}</span>
                    <span>{file.uploadedAt}</span>
                </div>
            </div>

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors">
                    <Eye className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors">
                    <Download className="w-4 h-4 text-white" />
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

export default MediaCard
