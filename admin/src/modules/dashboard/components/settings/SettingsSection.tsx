"use client"

import { GeneralSettings } from "./GeneralSettings"
import { AppearanceSettings } from "./AppearanceSettings"
import { UsersSettings } from "./UsersSettings"
import { SecuritySettings } from "./SecuritySettings"
import { EmailSettings } from "./EmailSettings"
import { DatabaseSettings } from "./DatabaseSettings"
import { NotificationsSettings } from "./NotificationsSettings"

interface SettingsSectionProps {
    section: string
}

export function SettingsSection({ section }: SettingsSectionProps) {
    switch (section) {
        case "general":
            return <GeneralSettings />
        case "appearance":
            return <AppearanceSettings />
        case "users":
            return <UsersSettings />
        case "security":
            return <SecuritySettings />
        case "email":
            return <EmailSettings />
        case "database":
            return <DatabaseSettings />
        case "notifications":
            return <NotificationsSettings />
        default:
            return <GeneralSettings />
    }
}

export default SettingsSection

