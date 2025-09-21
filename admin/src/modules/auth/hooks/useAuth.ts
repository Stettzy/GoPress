"use client"

import { useState } from "react"
import { authApi } from "../api/auth"
import type { LoginData } from "../types"

export function useAuth() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const login = async (data: LoginData) => {
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const response = await authApi.login(data)
            setSuccess(response.message)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        success,
        login,
    }
}