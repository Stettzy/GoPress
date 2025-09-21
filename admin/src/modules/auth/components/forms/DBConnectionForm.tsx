"use client"

import { useSetup } from "../../hooks/useSetup"
import { DBConnectionData } from "../../types"

export function DBConnectionForm() {
    const { saveDBConnection, loading, error, success } = useSetup()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const formData = new FormData(e.currentTarget)

        const data: DBConnectionData = {
            dbHost: formData.get("db_host") as string,
            dbPort: formData.get("db_port") as string,
            dbUser: formData.get("db_user") as string,
            dbPassword: formData.get("db_password") as string,
            dbName: formData.get("db_name") as string,
        }

        saveDBConnection(data)
    }

    const handleTestConnection = (e: React.MouseEvent<HTMLButtonElement>) => {
        const form = e.currentTarget.closest("form") as HTMLFormElement
        if (!form) return

        const formData = new FormData(form)

        const data: DBConnectionData = {
            dbHost: formData.get("db_host") as string,
            dbPort: formData.get("db_port") as string,
            dbUser: formData.get("db_user") as string,
            dbPassword: formData.get("db_password") as string,
            dbName: formData.get("db_name") as string,
        }

        console.log('Testing connection:', data)
    }

    return (
        <div>
            <form onSubmit={ handleSubmit } className="card w-lg px-6 p-8 flex flex-col space-y-4">
                <div>
                    <label className="label" htmlFor="db_host">DB Host</label>
                    <input className="input" type="text" id="db_host" name="db_host" />
                </div>
                <div>
                    <label className="label" htmlFor="db_port">DB Port</label>
                    <input className="input" type="text" id="db_port" name="db_port" />
                </div>
                <div>
                    <label className="label" htmlFor="db_user">DB User</label>
                    <input className="input" type="text" id="db_user" name="db_user" />
                </div>
                <div>
                    <label className="label" htmlFor="db_password">DB Password</label>
                    <input className="input" type="password" id="db_password" name="db_password" />
                </div>
                <div>
                    <label className="label" htmlFor="db_name">DB Name</label>
                    <input className="input" type="text" id="db_name" name="db_name" />
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-secondary flex-2" type="button" onClick={ handleTestConnection }>Test Connection</button>
                    <button className="btn btn-primary flex-1" type="submit">Save</button>
                </div>
                { error && <span className="text-xs text-red-500">{error}</span> }
                { success && <span className="text-xs text-green-500">{success}</span> }
            </form>
        </div>
    )
}