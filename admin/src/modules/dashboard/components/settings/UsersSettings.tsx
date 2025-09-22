"use client"

import { useState } from "react"
import { User, Shield, Mail, Clock } from "lucide-react"

export function UsersSettings() {
    const [settings, setSettings] = useState({
        allowRegistration: true,
        requireEmailVerification: true,
        allowPasswordReset: true,
        sessionTimeout: 24,
        maxLoginAttempts: 5,
        lockoutDuration: 15,
        defaultRole: "subscriber",
        requireStrongPasswords: true,
        twoFactorAuth: false,
        profilePictureRequired: false
    })

    const handleInputChange = (field: string, value: string | boolean | number) => {
        setSettings(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Users & Roles Settings</h2>
                <p className="text-muted-foreground">Configure user registration, authentication, and role management.</p>
            </div>

            <div className="space-y-6">
                {/* Registration Settings */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Registration Settings
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

                {/* Security Settings */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Security Settings
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Require Strong Passwords</label>
                                <p className="text-sm text-muted-foreground">Enforce password complexity requirements</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("requireStrongPasswords", !settings.requireStrongPasswords)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.requireStrongPasswords ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.requireStrongPasswords ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Two-Factor Authentication</label>
                                <p className="text-sm text-muted-foreground">Require 2FA for admin users</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("twoFactorAuth", !settings.twoFactorAuth)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.twoFactorAuth ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Allow Password Reset</label>
                                <p className="text-sm text-muted-foreground">Allow users to reset their passwords via email</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("allowPasswordReset", !settings.allowPasswordReset)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.allowPasswordReset ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.allowPasswordReset ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Session Settings */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Session Settings
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="label">Session Timeout (hours)</label>
                            <input
                                type="number"
                                value={settings.sessionTimeout}
                                onChange={(e) => handleInputChange("sessionTimeout", parseInt(e.target.value))}
                                min="1"
                                max="168"
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="label">Max Login Attempts</label>
                            <input
                                type="number"
                                value={settings.maxLoginAttempts}
                                onChange={(e) => handleInputChange("maxLoginAttempts", parseInt(e.target.value))}
                                min="3"
                                max="10"
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="label">Lockout Duration (minutes)</label>
                            <input
                                type="number"
                                value={settings.lockoutDuration}
                                onChange={(e) => handleInputChange("lockoutDuration", parseInt(e.target.value))}
                                min="5"
                                max="60"
                                className="input"
                            />
                        </div>
                    </div>
                </div>

                {/* Profile Settings */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4">Profile Settings</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Require Profile Picture</label>
                                <p className="text-sm text-muted-foreground">Users must upload a profile picture</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("profilePictureRequired", !settings.profilePictureRequired)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.profilePictureRequired ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.profilePictureRequired ? 'translate-x-6' : 'translate-x-1'
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

export default UsersSettings

