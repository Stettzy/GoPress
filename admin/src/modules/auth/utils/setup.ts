export const setupUtils = {
    isComplete: () => {
        return localStorage.getItem("setup_complete") === "true"
    },
    setComplete: () => {
        localStorage.setItem("setup_complete", "true")
        document.cookie = 'setup_complete=true; path=/'
    },
    reset: () => {
        localStorage.removeItem("setup_complete")
        document.cookie = 'setup_complete=; path=/'
    }
}