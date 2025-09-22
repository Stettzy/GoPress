"use client"

import { useState } from "react"
import { Globe, FileText, Calendar, MapPin } from "lucide-react"

export function GeneralSettings() {
    const [settings, setSettings] = useState({
        siteName: "GoPress CMS",
        siteDescription: "A modern content management system built with Go and Next.js",
        siteUrl: "https://gopress.example.com",
        adminEmail: "admin@gopress.example.com",
        timezone: "UTC",
        dateFormat: "YYYY-MM-DD",
        timeFormat: "24h",
        language: "en",
        allowRegistration: true,
        requireEmailVerification: true,
        defaultRole: "subscriber"
    })

    const handleInputChange = (field: string, value: string | boolean) => {
        setSettings(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">General Settings</h2>
                <p className="text-muted-foreground">Configure your site's basic information and settings.</p>
            </div>

            <div className="space-y-6">
                {/* Site Information */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Site Information
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="label">Site Name</label>
                            <input
                                type="text"
                                value={settings.siteName}
                                onChange={(e) => handleInputChange("siteName", e.target.value)}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="label">Site Description</label>
                            <textarea
                                value={settings.siteDescription}
                                onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                                className="input min-h-[80px] resize-none"
                                rows={3}
                            />
                        </div>
                        <div>
                            <label className="label">Site URL</label>
                            <input
                                type="url"
                                value={settings.siteUrl}
                                onChange={(e) => handleInputChange("siteUrl", e.target.value)}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="label">Admin Email</label>
                            <input
                                type="email"
                                value={settings.adminEmail}
                                onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                                className="input"
                            />
                        </div>
                    </div>
                </div>

                {/* Localization */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Localization
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label">Timezone</label>
                            <select
                                value={settings.timezone}
                                onChange={(e) => handleInputChange("timezone", e.target.value)}
                                className="input"
                            >
                                <option value="UTC">UTC</option>
                                <option value="America/New_York">Eastern Time</option>
                                <option value="America/Chicago">Central Time</option>
                                <option value="America/Denver">Mountain Time</option>
                                <option value="America/Los_Angeles">Pacific Time</option>
                                <option value="Europe/London">London</option>
                                <option value="Europe/Paris">Paris</option>
                                <option value="Asia/Tokyo">Tokyo</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">Language</label>
                            <select
                                value={settings.language}
                                onChange={(e) => handleInputChange("language", e.target.value)}
                                className="input"
                            >
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="it">Italian</option>
                                <option value="pt">Portuguese</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">Date Format</label>
                            <select
                                value={settings.dateFormat}
                                onChange={(e) => handleInputChange("dateFormat", e.target.value)}
                                className="input"
                            >
                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                <option value="MMM DD, YYYY">MMM DD, YYYY</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">Time Format</label>
                            <select
                                value={settings.timeFormat}
                                onChange={(e) => handleInputChange("timeFormat", e.target.value)}
                                className="input"
                            >
                                <option value="24h">24 Hour</option>
                                <option value="12h">12 Hour</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* User Registration */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        User Registration
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Allow User Registration</label>
                                <p className="text-sm text-muted-foreground">Allow new users to register on your site</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("allowRegistration", !settings.allowRegistration)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.allowRegistration ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.allowRegistration ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Require Email Verification</label>
                                <p className="text-sm text-muted-foreground">Users must verify their email before activation</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("requireEmailVerification", !settings.requireEmailVerification)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.requireEmailVerification ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.requireEmailVerification ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        <div>
                            <label className="label">Default User Role</label>
                            <select
                                value={settings.defaultRole}
                                onChange={(e) => handleInputChange("defaultRole", e.target.value)}
                                className="input"
                            >
                                <option value="subscriber">Subscriber</option>
                                <option value="author">Author</option>
                                <option value="editor">Editor</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeneralSettings

