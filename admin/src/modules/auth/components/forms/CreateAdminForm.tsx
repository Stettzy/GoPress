"use client"

import { useSetup } from "../../hooks/useSetup"
import { AdminData } from "../../types"

export function CreateAdminForm() {
    const { createAdmin, loading, error, success } = useSetup()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const data: AdminData = {
            name: formData.get("name") as string,
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            role: "admin",
        }

        createAdmin(data)
    }

    return (
        <div>
            <form onSubmit={ handleSubmit } className="card w-lg px-6 p-8 flex flex-col space-y-4">
                <div>
                    <label className="label" htmlFor="name">Name</label>
                    <input className="input" type="text" id="name" name="name" />
                </div>
                <div>
                    <label className="label" htmlFor="username">Username</label>
                    <input className="input" type="text" id="username" name="username" />
                </div>
                <div>
                    <label className="label" htmlFor="email">Email</label>
                    <input className="input" type="email" id="email" name="email" />
                </div>
                <div>
                    <label className="label" htmlFor="password">Password</label>
                    <input className="input" type="password" id="password" name="password" />
                </div>
                <button className="btn btn-primary" type="submit">Create Admin</button>
            </form>
        </div>
    )
}