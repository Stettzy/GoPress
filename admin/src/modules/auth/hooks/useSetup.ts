"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { setupApi } from "../api/setup"
import { setupUtils } from "../utils/setup"
import { ROUTES } from "@/shared/constants/routes"
import type { DBConnectionData, AdminData } from "../types"


export function useSetup() {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const router = useRouter()

    const saveDBConnection = async (data: DBConnectionData) => {
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const response = await setupApi.saveDBConnection(data)
            setSuccess(response.message)

            setTimeout(() => {
                router.push(ROUTES.SETUP.CREATE_ADMIN_USER)
            }, 3000)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const createAdmin = async (data: AdminData) => {
        setLoading(true)
        setError(null)
        setSuccess(null)
        
        try {
            const response = await setupApi.createAdmin(data)
            setSuccess(response.message)
            setupUtils.setComplete()
            router.push(ROUTES.ADMIN.LOGIN)
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
        saveDBConnection,
        createAdmin,
    }
}