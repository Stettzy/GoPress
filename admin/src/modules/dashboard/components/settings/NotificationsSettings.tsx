"use client"

import { useState } from "react"
import { Bell, Mail, MessageSquare, AlertCircle } from "lucide-react"

export function NotificationsSettings() {
    const [settings, setSettings] = useState({
        enableNotifications: true,
        enableEmailNotifications: true,
        enablePushNotifications: false,
        enableInAppNotifications: true,
        notifyNewUsers: true,
        notifyNewArticles: true,
        notifyComments: true,
        notifySystemUpdates: true,
        notificationFrequency: "immediate",
        quietHours: false,
        quietStart: "22:00",
        quietEnd: "08:00"
    })

    const handleInputChange = (field: string, value: string | boolean) => {
        setSettings(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Notification Settings</h2>
                <p className="text-muted-foreground">Configure notification preferences and delivery methods.</p>
            </div>

            <div className="space-y-6">
                {/* Notification Methods */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Notification Methods
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Enable Notifications</label>
                                <p className="text-sm text-muted-foreground">Receive system notifications</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("enableNotifications", !settings.enableNotifications)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.enableNotifications ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.enableNotifications ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Email Notifications</label>
                                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
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
                                <label className="font-medium text-foreground">In-App Notifications</label>
                                <p className="text-sm text-muted-foreground">Show notifications in the admin panel</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("enableInAppNotifications", !settings.enableInAppNotifications)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.enableInAppNotifications ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.enableInAppNotifications ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notification Types */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Notification Types
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">New User Registration</label>
                                <p className="text-sm text-muted-foreground">Notify when new users register</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("notifyNewUsers", !settings.notifyNewUsers)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.notifyNewUsers ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.notifyNewUsers ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">New Articles</label>
                                <p className="text-sm text-muted-foreground">Notify when new articles are published</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("notifyNewArticles", !settings.notifyNewArticles)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.notifyNewArticles ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.notifyNewArticles ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">New Comments</label>
                                <p className="text-sm text-muted-foreground">Notify when new comments are posted</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("notifyComments", !settings.notifyComments)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.notifyComments ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.notifyComments ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">System Updates</label>
                                <p className="text-sm text-muted-foreground">Notify about system updates and maintenance</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("notifySystemUpdates", !settings.notifySystemUpdates)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.notifySystemUpdates ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.notifySystemUpdates ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notification Preferences */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Notification Preferences
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="label">Notification Frequency</label>
                            <select
                                value={settings.notificationFrequency}
                                onChange={(e) => handleInputChange("notificationFrequency", e.target.value)}
                                className="input"
                            >
                                <option value="immediate">Immediate</option>
                                <option value="hourly">Hourly Digest</option>
                                <option value="daily">Daily Digest</option>
                                <option value="weekly">Weekly Digest</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Quiet Hours</label>
                                <p className="text-sm text-muted-foreground">Pause notifications during specific hours</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("quietHours", !settings.quietHours)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.quietHours ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.quietHours ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        {settings.quietHours && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="label">Start Time</label>
                                    <input
                                        type="time"
                                        value={settings.quietStart}
                                        onChange={(e) => handleInputChange("quietStart", e.target.value)}
                                        className="input"
                                    />
                                </div>
                                <div>
                                    <label className="label">End Time</label>
                                    <input
                                        type="time"
                                        value={settings.quietEnd}
                                        onChange={(e) => handleInputChange("quietEnd", e.target.value)}
                                        className="input"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationsSettings
