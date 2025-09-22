function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2 className="text-foreground font-medium">{ props.children }</h2>
    )
}

function CardContent(props: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <p className="text-sm text-foreground">{ props.children }</p>
    )
}

function CardIcon(props: React.HTMLAttributes<HTMLElement>) {
    return (
        <div className="flex text-foreground items-center justify-center w-10 h-10 rounded-md">{ props.children }</div>
    )
}

function List(props: React.HTMLAttributes<HTMLUListElement>) {
    return (
        <ul className="space-y-3">{ props.children }</ul>
    )
}

function ListItem(props: React.HTMLAttributes<HTMLLIElement>) {
    return (
        <li className="bg-background rounded-lg p-4 border border-border/80 hover:bg-muted/10 transition-colors">
            { props.children }
        </li>
    )
}

function ContentListCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="space-y-4 bg-background rounded-lg p-4 border border-border/80">
            { children }
        </div>
    )
}

ContentListCard.CardTitle = CardTitle;
ContentListCard.CardContent = CardContent;
ContentListCard.CardIcon = CardIcon;
ContentListCard.List = List;
ContentListCard.ListItem = ListItem;

export default ContentListCard;