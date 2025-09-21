export type DBConnectionData = {
    dbHost: string
    dbPort: string
    dbUser: string
    dbPassword: string
    dbName: string
}

export type AdminData = {
    name: string
    username: string
    email: string
    password: string
    role: string
}

export type LoginData = {
    username: string
    password: string
}

export type LogoutData = {
    token: string
}