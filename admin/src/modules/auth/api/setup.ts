import type { DBConnectionData, AdminData } from "../types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

const ENDPOINTS = {
    SAVE_DB_CONNECTION: `${API_BASE_URL}/api/setup/database`,
    CREATE_ADMIN: `${API_BASE_URL}/api/setup/admin`,
}

export const setupApi = {
    saveDBConnection: async (data: DBConnectionData) => {
        const response = await fetch(ENDPOINTS.SAVE_DB_CONNECTION, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        })
        return response.json()
    },
    createAdmin: async (data: AdminData) => {
        const response = await fetch(ENDPOINTS.CREATE_ADMIN, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        })
        return response.json()
    }
}