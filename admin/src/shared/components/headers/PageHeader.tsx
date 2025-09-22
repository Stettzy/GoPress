export function PageHeader({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <header className="flex justify-between items-center w-full">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex items-center gap-2">
                {children}
            </div>
        </header>
    )
}