
export const tokenUtils = {
    getToken: () => {
        return localStorage.getItem("token")
    },
    setToken: (token: string) => {
        localStorage.setItem("token", token)
    },
    removeToken: () => {
        localStorage.removeItem("token")
    },
    isValid: (): boolean => {
        const token = tokenUtils.getToken()
        if (!token) return false

        try {
            const decoded = JSON.parse(atob(token.split(".")[1]))
            return decoded.exp * 1000 > Date.now()
        } catch {
            return false
        }
    }
}