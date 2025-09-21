import Link from "next/link"
import type { LoginData } from "@/modules/auth"
import { useAuth } from "@/modules/auth"

export function LoginForm() {
    const { login, loading, error, success } = useAuth()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const data: LoginData = {
            username: formData.get("username") as string,
            password: formData.get("password") as string,
        }

        login(data)
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="card w-82 px-6 p-8 flex flex-col space-y-4">
                <div>
                    <label className="label" htmlFor="username">Username</label>
                    <input className="input" type="text" id="username" name="username" />
                </div>
                <div>
                    <label className="label" htmlFor="password">Password</label>
                    <input className="input" type="password" id="password" name="password" />
                </div>
                <button className="btn btn-primary" type="submit">Login</button>
                { error && <span className="text-xs text-red-500">{error}</span> }
                { success && <span className="text-xs text-green-500">{success}</span> }
            </form>
            <div className="flex flex-col mt-4 text-center text-xs">
                <p>Forgot your password? <Link href="/signup" className="link">Reset</Link></p>
                <p>Don't have an account? <Link href="/signup" className="link">Sign up</Link></p>
            </div>
        </>
    )
}
