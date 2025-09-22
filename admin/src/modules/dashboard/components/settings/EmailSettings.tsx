"use client"

import { useState } from "react"
import { Mail, Server, Send } from "lucide-react"

export function EmailSettings() {
    const [settings, setSettings] = useState({
        smtpHost: "smtp.gmail.com",
        smtpPort: 587,
        smtpUsername: "",
        smtpPassword: "",
        smtpSecure: false,
        fromEmail: "noreply@gopress.example.com",
        fromName: "GoPress CMS",
        enableEmailNotifications: true,
        enableWelcomeEmail: true,
        enablePasswordResetEmail: true
    })

    const handleInputChange = (field: string, value: string | boolean | number) => {
        setSettings(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Email Settings</h2>
                <p className="text-muted-foreground">Configure email server and notification settings.</p>
            </div>

            <div className="space-y-6">
                {/* SMTP Configuration */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <Server className="w-4 h-4" />
                        SMTP Configuration
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">SMTP Host</label>
                                <input
                                    type="text"
                                    value={settings.smtpHost}
                                    onChange={(e) => handleInputChange("smtpHost", e.target.value)}
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="label">SMTP Port</label>
                                <input
                                    type="number"
                                    value={settings.smtpPort}
                                    onChange={(e) => handleInputChange("smtpPort", parseInt(e.target.value))}
                                    className="input"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">Username</label>
                                <input
                                    type="text"
                                    value={settings.smtpUsername}
                                    onChange={(e) => handleInputChange("smtpUsername", e.target.value)}
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="label">Password</label>
                                <input
                                    type="password"
                                    value={settings.smtpPassword}
                                    onChange={(e) => handleInputChange("smtpPassword", e.target.value)}
                                    className="input"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Use SSL/TLS</label>
                                <p className="text-sm text-muted-foreground">Enable secure connection</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("smtpSecure", !settings.smtpSecure)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.smtpSecure ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.smtpSecure ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Email Templates */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Templates
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">From Email</label>
                                <input
                                    type="email"
                                    value={settings.fromEmail}
                                    onChange={(e) => handleInputChange("fromEmail", e.target.value)}
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="label">From Name</label>
                                <input
                                    type="text"
                                    value={settings.fromName}
                                    onChange={(e) => handleInputChange("fromName", e.target.value)}
                                    className="input"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Email Notifications */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Email Notifications
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Enable Email Notifications</label>
                                <p className="text-sm text-muted-foreground">Send system notifications via email</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("enableEmailNotifications", !settings.enableEmailNotifications)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.enableEmailNotifications ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.enableEmailNotifications ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Welcome Email</label>
                                <p className="text-sm text-muted-foreground">Send welcome email to new users</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("enableWelcomeEmail", !settings.enableWelcomeEmail)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.enableWelcomeEmail ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.enableWelcomeEmail ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Password Reset Email</label>
                                <p className="text-sm text-muted-foreground">Send password reset instructions</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("enablePasswordResetEmail", !settings.enablePasswordResetEmail)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.enablePasswordResetEmail ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.enablePasswordResetEmail ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailSettings

