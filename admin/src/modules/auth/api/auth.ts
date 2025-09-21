import type { LoginData, LogoutData } from "../types"
import { tokenUtils } from "../utils/token"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

const ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
}

export const authApi = {
    login: async (data: LoginData) => {
        const response = await fetch(ENDPOINTS.LOGIN, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
            credentials: 'include',
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.error || errorData.message || 'Login failed')
        }

        return response.json()
    },
    logout: async (data: LogoutData) => {
        const response = await fetch(ENDPOINTS.LOGOUT, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
            credentials: 'include',
        })

        return response.json()
    }
}