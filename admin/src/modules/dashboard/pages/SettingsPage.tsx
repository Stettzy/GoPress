"use client"

import { Settings, Save, Globe, User, Shield, Mail, Database, Palette, Bell } from "lucide-react"
import { PageHeader } from "@/shared/components/headers/PageHeader"
import { SettingsSection } from "../components/settings/SettingsSection"
import { useState } from "react"

export function SettingsPage() {
    const [activeSection, setActiveSection] = useState("general")

    const settingsSections = [
        {
            id: "general",
            title: "General",
            icon: <Globe className="w-5 h-5" />,
            description: "Site name, description, and basic settings"
        },
        {
            id: "appearance",
            title: "Appearance",
            icon: <Palette className="w-5 h-5" />,
            description: "Theme, colors, and visual settings"
        },
        {
            id: "users",
            title: "Users & Roles",
            icon: <User className="w-5 h-5" />,
            description: "User registration and role management"
        },
        {
            id: "security",
            title: "Security",
            icon: <Shield className="w-5 h-5" />,
            description: "Security settings and access control"
        },
        {
            id: "email",
            title: "Email",
            icon: <Mail className="w-5 h-5" />,
            description: "Email configuration and notifications"
        },
        {
            id: "database",
            title: "Database",
            icon: <Database className="w-5 h-5" />,
            description: "Database settings and maintenance"
        },
        {
            id: "notifications",
            title: "Notifications",
            icon: <Bell className="w-5 h-5" />,
            description: "Notification preferences and settings"
        }
    ]

    return (
        <div className="space-y-8">
            <PageHeader title="Settings">
                <div className="flex items-center gap-2">
                    <button className="cursor-pointer flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-md hover:bg-accent/90 transition-all">
                        <Save className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Settings Navigation */}
                <div className="lg:col-span-1">
                    <div className="card">
                        <h3 className="font-medium text-foreground mb-4">Settings</h3>
                        <nav className="space-y-2">
                            {settingsSections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full text-left p-3 rounded-md transition-all ${
                                        activeSection === section.id
                                            ? "bg-accent text-accent-foreground"
                                            : "hover:bg-muted"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {section.icon}
                                        <div>
                                            <div className="font-medium">{section.title}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {section.description}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-3">
                    <SettingsSection section={activeSection} />
                </div>
            </div>
        </div>
    )
}

