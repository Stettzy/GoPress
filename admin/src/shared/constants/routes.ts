export const ROUTES = {
    ADMIN: {
        LOGIN: "/admin/login",
        DASHBOARD: "/admin/dashboard",
    },
    SETUP: {
        DB_CONNECTION: "/setup/connection",
        CREATE_ADMIN_USER: "/setup/user",
    },
}

export const getAuthenticatedRoutes = () => {
    return [
        ROUTES.ADMIN.DASHBOARD,
    ]
}

export const getSetupRoutes = () => {
    return [
        ROUTES.SETUP.DB_CONNECTION,
        ROUTES.SETUP.CREATE_ADMIN_USER,
    ]
}