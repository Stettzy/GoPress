function CardIcon(props: React.HTMLAttributes<HTMLElement>) {
    return (
        <div className="flex text-foreground items-center justify-center w-10 h-10 rounded-md">{ props.children }</div>
    )
}

function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2 className="text-sm text-foreground font-medium">{ props.children }</h2>
    )
}

function CardContent(props: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <p className="text-4xl text-foreground font-bold">{ props.children }</p>
    )
}

function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className="card bg-background flex flex-col gap-2">
            { children }
        </div>
    )
}

function StatCard({ children }: { children: React.ReactNode }) {
    return (
        <Card>
            {children}
        </Card>
    )
}

StatCard.CardTitle = CardTitle;
StatCard.CardContent = CardContent;
StatCard.CardIcon = CardIcon;

export default StatCard;