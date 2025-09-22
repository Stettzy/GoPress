"use client"

import { useState } from "react"
import { Database, Trash2, Download, Upload, RefreshCw } from "lucide-react"

export function DatabaseSettings() {
    const [settings, setSettings] = useState({
        dbHost: "localhost",
        dbPort: 5432,
        dbName: "gopress",
        dbUser: "gopress_user",
        enableBackups: true,
        backupFrequency: "daily",
        backupRetention: 30,
        enableLogging: true,
        logLevel: "info"
    })

    const handleInputChange = (field: string, value: string | boolean | number) => {
        setSettings(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Database Settings</h2>
                <p className="text-muted-foreground">Configure database connection and maintenance settings.</p>
            </div>

            <div className="space-y-6">
                {/* Database Connection */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        Database Connection
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">Host</label>
                                <input
                                    type="text"
                                    value={settings.dbHost}
                                    onChange={(e) => handleInputChange("dbHost", e.target.value)}
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="label">Port</label>
                                <input
                                    type="number"
                                    value={settings.dbPort}
                                    onChange={(e) => handleInputChange("dbPort", parseInt(e.target.value))}
                                    className="input"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">Database Name</label>
                                <input
                                    type="text"
                                    value={settings.dbName}
                                    onChange={(e) => handleInputChange("dbName", e.target.value)}
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="label">Username</label>
                                <input
                                    type="text"
                                    value={settings.dbUser}
                                    onChange={(e) => handleInputChange("dbUser", e.target.value)}
                                    className="input"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Backup Settings */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Backup Settings
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-foreground">Enable Automatic Backups</label>
                                <p className="text-sm text-muted-foreground">Automatically backup database</p>
                            </div>
                            <button
                                onClick={() => handleInputChange("enableBackups", !settings.enableBackups)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    settings.enableBackups ? 'bg-accent' : 'bg-muted'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        settings.enableBackups ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                        {settings.enableBackups && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="label">Backup Frequency</label>
                                    <select
                                        value={settings.backupFrequency}
                                        onChange={(e) => handleInputChange("backupFrequency", e.target.value)}
                                        className="input"
                                    >
                                        <option value="hourly">Hourly</option>
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="label">Retention (days)</label>
                                    <input
                                        type="number"
                                        value={settings.backupRetention}
                                        onChange={(e) => handleInputChange("backupRetention", parseInt(e.target.value))}
                                        min="1"
                                        max="365"
                                        className="input"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Database Actions */}
                <div className="card">
                    <h3 className="font-medium text-foreground mb-4">Database Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="btn btn-outline">
                            <Download className="w-4 h-4 mr-2" />
                            Create Backup
                        </button>
                        <button className="btn btn-outline">
                            <Upload className="w-4 h-4 mr-2" />
                            Restore Backup
                        </button>
                        <button className="btn btn-outline">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Optimize Database
                        </button>
                        <button className="btn btn-outline text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Clear Cache
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DatabaseSettings

