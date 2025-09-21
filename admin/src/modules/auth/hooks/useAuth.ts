"use client"

import { useState } from "react"
import { authApi } from "../api/auth"
import type { LoginData } from "../types"
import { useRouter } from "next/navigation"
import { tokenUtils } from "../utils/token"
import { ROUTES } from "@/shared/constants/routes"
import { userUtils } from "../utils/user"

export function useAuth() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const router = useRouter()

    const login = async (data: LoginData) => {
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const response = await authApi.login(data)
            setSuccess(response.message)
            tokenUtils.setToken(response.token)
            userUtils.setUser(response.user)
            router.push(ROUTES.ADMIN.DASHBOARD)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        await authApi.logout({ token: tokenUtils.getToken() || "" })
        tokenUtils.removeToken()
        userUtils.removeUser()
        router.push(ROUTES.ADMIN.LOGIN)
    }

    return {
        loading,
        error,
        success,
        login,
        logout,
    }
}