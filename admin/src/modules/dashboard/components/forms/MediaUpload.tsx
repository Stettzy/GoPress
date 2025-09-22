"use client"

import { Upload, X, FileText, Image, Video, Music } from "lucide-react"
import { useState, useRef } from "react"

interface MediaUploadProps {
    onUpload?: (files: File[]) => void
}

export function MediaUpload({ onUpload }: MediaUploadProps) {
    const [dragActive, setDragActive] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const files = Array.from(e.dataTransfer.files)
            setSelectedFiles(prev => [...prev, ...files])
        }
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const files = Array.from(e.target.files)
            setSelectedFiles(prev => [...prev, ...files])
        }
    }

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleUpload = () => {
        if (selectedFiles.length > 0 && onUpload) {
            onUpload(selectedFiles)
            setSelectedFiles([])
        }
    }

    const getFileIcon = (file: File) => {
        if (file.type.startsWith('image/')) return <Image className="w-4 h-4" />
        if (file.type.startsWith('video/')) return <Video className="w-4 h-4" />
        if (file.type.startsWith('audio/')) return <Music className="w-4 h-4" />
        return <FileText className="w-4 h-4" />
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    return (
        <div className="space-y-4">
            {/* Upload Area */}
            <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                    dragActive
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                />
                
                <div className="space-y-4">
                    <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <Upload className="w-6 h-6 text-muted-foreground" />
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-medium text-foreground mb-2">
                            Drop files here or click to browse
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Supports images, videos, audio, and documents
                        </p>
                    </div>
                    
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="btn btn-outline"
                    >
                        Choose Files
                    </button>
                </div>
            </div>

            {/* Selected Files */}
            {selectedFiles.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-foreground">
                            Selected Files ({selectedFiles.length})
                        </h4>
                        <button
                            onClick={handleUpload}
                            className="btn btn-accent"
                        >
                            Upload All
                        </button>
                    </div>
                    
                    <div className="space-y-2">
                        {selectedFiles.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-background border border-border rounded-md"
                            >
                                <div className="flex items-center gap-3">
                                    {getFileIcon(file)}
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatFileSize(file.size)}
                                        </p>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={() => removeFile(index)}
                                    className="p-1 hover:bg-muted rounded-md transition-colors"
                                >
                                    <X className="w-4 h-4 text-muted-foreground" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MediaUpload
