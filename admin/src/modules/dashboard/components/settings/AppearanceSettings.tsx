"use client"

import { useState } from "react"
import { Palette, Sun, Moon, Monitor, Image } from "lucide-react"

export function AppearanceSettings() {
    const [settings, setSettings] = useState({
        theme: "system",
        primaryColor: "#3B82F6",
        secondaryColor: "#4F5D75",
        accentColor: "#EF8354",
        logo: "",
        favicon: "",
        customCss: "",
        showBreadcrumbs: true,
        showSidebar: true,
        sidebarCollapsed: false
    })

    const handleInputChange = (field: string, value: string | boolean) => {
        setSettings(prev => ({ ...prev, [field]: value }))
    }

    const predefinedColors = [
        { name: "Blue", value: "#3B82F6" },
        { name: "Green", value: "#10B981" },
        { name: "Purple", value: "#8B5CF6" },
        { name: "Red", value: "#EF4444" },
        { name: "Orange", value: "#F59E0B" },
        { name: "Pink", value: "#EC4899" },
        { name: "Teal", value: "#14B8A6" },
        { name: "Indigo", value: "#6366F1" }
    ]

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Appearance Settings</h2>
                <p className="text-muted-foreground">Customize the look and feel of your admin dashboard.</p>
            </div>

            <div className="space-y-6">
                {/* Theme Settings */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Theme
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="label">Theme Mode</label>
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    onClick={() => handleInputChange("theme", "light")}
                                    className={`p-4 rounded-lg border-2 transition-all ${
                                        settings.theme === "light" 
                                            ? "border-accent bg-accent/10" 
                                            : "border-border hover:border-accent/50"
                                    }`}
                                >
                                    <Sun className="w-6 h-6 mx-auto mb-2" />
                                    <div className="text-sm font-medium">Light</div>
                                </button>
                                <button
                                    onClick={() => handleInputChange("theme", "dark")}
                                    className={`p-4 rounded-lg border-2 transition-all ${
                                        settings.theme === "dark" 
                                            ? "border-accent bg-accent/10" 
                                            : "border-border hover:border-accent/50"
                                    }`}
                                >
                                    <Moon className="w-6 h-6 mx-auto mb-2" />
                                    <div className="text-sm font-medium">Dark</div>
                                </button>
                                <button
                                    onClick={() => handleInputChange("theme", "system")}
                                    className={`p-4 rounded-lg border-2 transition-all ${
                                        settings.theme === "system" 
                                            ? "border-accent bg-accent/10" 
                                            : "border-border hover:border-accent/50"
                                    }`}
                                >
                                    <Monitor className="w-6 h-6 mx-auto mb-2" />
                                    <div className="text-sm font-medium">System</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Color Scheme */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Color Scheme
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="label">Primary Color</label>
                            <div className="flex items-center gap-3">
                                <div 
                                    className="w-8 h-8 rounded-lg border-2 border-border"
                                    style={{ backgroundColor: settings.primaryColor }}
                                />
                                <input
                                    type="text"
                                    value={settings.primaryColor}
                                    onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                                    className="input flex-1"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-2 mt-3">
                                {predefinedColors.map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() => handleInputChange("primaryColor", color.value)}
                                        className={`w-8 h-8 rounded-lg border-2 transition-all ${
                                            settings.primaryColor === color.value 
                                                ? "border-foreground scale-110" 
                                                : "border-border hover:scale-105"
                                        }`}
                                        style={{ backgroundColor: color.value }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="label">Secondary Color</label>
                            <div className="flex items-center gap-3">
                                <div 
                                    className="w-8 h-8 rounded-lg border-2 border-border"
                                    style={{ backgroundColor: settings.secondaryColor }}
                                />
                                <input
                                    type="text"
                                    value={settings.secondaryColor}
                                    onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                                    className="input flex-1"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="label">Accent Color</label>
                            <div className="flex items-center gap-3">
                                <div 
                                    className="w-8 h-8 rounded-lg border-2 border-border"
                                    style={{ backgroundColor: settings.accentColor }}
                                />
                                <input
                                    type="text"
                                    value={settings.accentColor}
                                    onChange={(e) => handleInputChange("accentColor", e.target.value)}
                                    className="input flex-1"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Branding */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <Image className="w-4 h-4" />
                        Branding
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="label">Logo URL</label>
                            <input
                                type="url"
                                value={settings.logo}
                                onChange={(e) => handleInputChange("logo", e.target.value)}
                                placeholder="https://example.com/logo.png"
                                className="input"
                            />
                            {settings.logo && (
                                <div className="mt-2">
                                    <img
                                        src={settings.logo}
                                        alt="Logo preview"
                                        className="h-12 object-contain"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement
                                            target.style.display = 'none'
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="label">Favicon URL</label>
                            <input
                                type="url"
                                value={settings.favicon}
                                onChange={(e) => handleInputChange("favicon", e.target.value)}
                                placeholder="https://example.com/favicon.ico"
                                className="input"
                            />
                        </div>
                    </div>
                </div>

                {/* Layout Options */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4">Layout Options</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Show Breadcrumbs</label>
                                <p className="text-sm text-muted-foreground">Display navigation breadcrumbs</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("showBreadcrumbs", !settings.showBreadcrumbs)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.showBreadcrumbs ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.showBreadcrumbs ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Show Sidebar</label>
                                <p className="text-sm text-muted-foreground">Display the navigation sidebar</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("showSidebar", !settings.showSidebar)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.showSidebar ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.showSidebar ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Custom CSS */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4">Custom CSS</h3>
                    <div>
                        <label className="label">Custom Styles</label>
                        <textarea
                            value={settings.customCss}
                            onChange={(e) => handleInputChange("customCss", e.target.value)}
                            placeholder="/* Add your custom CSS here */"
                            className="input min-h-[200px] resize-none font-mono text-sm"
                            rows={10}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                            Add custom CSS to override default styles
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppearanceSettings

