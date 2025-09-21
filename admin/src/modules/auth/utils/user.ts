import { User } from "@/modules/auth/types"

export const userUtils = {
    getUser: () => {
        return localStorage.getItem("user")
    },
    setUser: (user: User) => {
        localStorage.setItem("user", JSON.stringify(user))
    },
    removeUser: () => {
        localStorage.removeItem("user")
    }
}