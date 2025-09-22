"use client"

import { useState } from "react"
import { Shield, Lock, Eye, AlertTriangle } from "lucide-react"

export function SecuritySettings() {
    const [settings, setSettings] = useState({
        enableHttps: true,
        enableCors: true,
        corsOrigins: "https://gopress.example.com",
        enableRateLimiting: true,
        rateLimitRequests: 100,
        rateLimitWindow: 15,
        enableIpWhitelist: false,
        ipWhitelist: "",
        enableAuditLog: true,
        sessionSecure: true,
        sessionHttpOnly: true,
        sessionSameSite: "strict"
    })

    const handleInputChange = (field: string, value: string | boolean | number) => {
        setSettings(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Security Settings</h2>
                <p className="text-muted-foreground">Configure security policies and access controls.</p>
            </div>

            <div className="space-y-6">
                {/* HTTPS Settings */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        HTTPS & SSL
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Force HTTPS</label>
                                <p className="text-sm text-muted-foreground">Redirect all HTTP traffic to HTTPS</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("enableHttps", !settings.enableHttps)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.enableHttps ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.enableHttps ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* CORS Settings */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        CORS Settings
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Enable CORS</label>
                                <p className="text-sm text-muted-foreground">Allow cross-origin requests</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("enableCors", !settings.enableCors)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.enableCors ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.enableCors ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        {settings.enableCors && (
                            <div>
                                <label className="label">Allowed Origins</label>
                                <textarea
                                    value={settings.corsOrigins}
                                    onChange={(e) => handleInputChange("corsOrigins", e.target.value)}
                                    placeholder="https://example.com, https://app.example.com"
                                    className="input min-h-[80px] resize-none"
                                    rows={3}
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Comma-separated list of allowed origins
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Rate Limiting */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Rate Limiting
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Enable Rate Limiting</label>
                                <p className="text-sm text-muted-foreground">Limit requests per IP address</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("enableRateLimiting", !settings.enableRateLimiting)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.enableRateLimiting ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.enableRateLimiting ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        {settings.enableRateLimiting && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="label">Requests per Window</label>
                                    <input
                                        type="number"
                                        value={settings.rateLimitRequests}
                                        onChange={(e) => handleInputChange("rateLimitRequests", parseInt(e.target.value))}
                                        min="10"
                                        max="1000"
                                        className="input"
                                    />
                                </div>
                                <div>
                                    <label className="label">Window (minutes)</label>
                                    <input
                                        type="number"
                                        value={settings.rateLimitWindow}
                                        onChange={(e) => handleInputChange("rateLimitWindow", parseInt(e.target.value))}
                                        min="1"
                                        max="60"
                                        className="input"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Session Security */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Session Security
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Secure Cookies</label>
                                <p className="text-sm text-muted-foreground">Only send cookies over HTTPS</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("sessionSecure", !settings.sessionSecure)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.sessionSecure ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.sessionSecure ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">HTTP Only Cookies</label>
                                <p className="text-sm text-muted-foreground">Prevent JavaScript access to cookies</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("sessionHttpOnly", !settings.sessionHttpOnly)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.sessionHttpOnly ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.sessionHttpOnly ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        <div>
                            <label className="label">SameSite Policy</label>
                            <select
                                value={settings.sessionSameSite}
                                onChange={(e) => handleInputChange("sessionSameSite", e.target.value)}
                                className="input"
                            >
                                <option value="strict">Strict</option>
                                <option value="lax">Lax</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecuritySettings

