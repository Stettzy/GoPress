"use client"

import { UserCircle, FileTextIcon, MessageCircle, EyeIcon, Calendar, Edit, Trash2, Check, Plus, Users, MessageSquare, BarChart3 } from "lucide-react"
import StatCard from "../components/cards/StatCard"
import ContentListCard from "../components/cards/ContentListCard"
import QuickActionCard from "../components/cards/QuickActionCard"

export function DashboardPage() {

    const mainStats = [
        {
            id: 1,
            title: "Total Users",
            content: "2,350",
            icon: <UserCircle />,
        },
        {
            id: 2,
            title: "Total Articles",
            content: "103,390",
            icon: <FileTextIcon />,
        },
        {
            id: 3,
            title: "Comments",
            content: "32,391",
            icon: <MessageCircle />,
        },
        {
            id: 4,
            title: "Page Views",
            content: "1,25M",
            icon: <EyeIcon />,
        },
    ]

    const recentPosts = [
        {
            id: 1,
            title: "Getting Started with WordPress",
            status: "Published",
            statusColor: "bg-primary text-primary-foreground",
            timestamp: "2 hours ago",
            views: "1.2K",
            icon: <FileTextIcon />,
        },
        {
            id: 2,
            title: "Advanced Custom Fields Guide",
            status: "Draft",
            statusColor: "bg-muted text-muted-foreground",
            timestamp: "1 day ago",
            views: "856",
            icon: <FileTextIcon />,
        },
        {
            id: 3,
            title: "SEO Best Practices 2024",
            status: "Published",
            statusColor: "bg-primary text-primary-foreground",
            timestamp: "3 days ago",
            views: "2.1K",
            icon: <FileTextIcon />,
        },
        {
            id: 4,
            title: "Theme Development Tips",
            status: "Scheduled",
            statusColor: "bg-muted text-muted-foreground",
            timestamp: "5 days ago",
            views: "0",
            icon: <FileTextIcon />,
        },
    ]

    const recentComments = [
        {
            id: 1,
            title: "Great article!",
            timestamp: "2 hours ago",
            icon: <MessageCircle />,
        },
        {
            id: 2,
            title: "Great article!",
            timestamp: "2 hours ago",
            icon: <MessageCircle />,
        },
        {
            id: 3,
            title: "Great article!",
            timestamp: "2 hours ago",
            icon: <MessageCircle />,
        },
        {
            id: 4,
            title: "Great article!",
            timestamp: "2 hours ago",
            icon: <MessageCircle />,
        },
    ]

    const quickActions = [
        {
            id: 1,
            title: "New Post",
            icon: <FileTextIcon className="w-6 h-6" />,
            variant: "primary" as const,
            onClick: () => console.log("Create new post")
        },
        {
            id: 2,
            title: "Manage Users",
            icon: <Users className="w-6 h-6" />,
            variant: "default" as const,
            onClick: () => console.log("Manage users")
        },
        {
            id: 3,
            title: "Moderate Comments",
            icon: <MessageSquare className="w-6 h-6" />,
            variant: "default" as const,
            onClick: () => console.log("Moderate comments")
        },
        {
            id: 4,
            title: "View Analytics",
            icon: <BarChart3 className="w-6 h-6" />,
            variant: "default" as const,
            onClick: () => console.log("View analytics")
        },
    ]

    return (
        <div className="space-y-12">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="space-y-4">
                <div>
                    <h2 className="text-xl font-semibold">Quick Actions</h2>
                    <p className="text-muted-foreground text-sm">Common tasks to manage your WordPress site.</p>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {quickActions.map((action) => (
                        <QuickActionCard 
                            key={action.id} 
                            variant={action.variant}
                            onClick={action.onClick}
                        >
                            <QuickActionCard.ActionIcon>
                                {action.icon}
                            </QuickActionCard.ActionIcon>
                            <QuickActionCard.ActionTitle>
                                {action.title}
                            </QuickActionCard.ActionTitle>
                        </QuickActionCard>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <ContentListCard>
                    <ContentListCard.CardTitle>Recent Posts</ContentListCard.CardTitle>
                    <ContentListCard.CardContent>Your latest blog posts and their performance.</ContentListCard.CardContent>
                    <ContentListCard.List>
                        {recentPosts.map((post) => (
                            <ContentListCard.ListItem key={post.id}>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-foreground">{post.title}</h3>
                                        <div className="flex items-center gap-4 mt-2">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${post.statusColor}`}>
                                                {post.status}
                                            </span>
                                            <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                                <Calendar className="w-4 h-4" />
                                                {post.timestamp}
                                            </div>
                                            <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                                <EyeIcon className="w-4 h-4" />
                                                {post.views}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 hover:bg-muted rounded-md transition-all">
                                            <Edit className="w-4 h-4 text-muted-foreground" />
                                        </button>
                                        <button className="p-2 hover:bg-muted rounded-md transition-all">
                                            <Trash2 className="w-4 h-4 text-muted-foreground" />
                                        </button>
                                    </div>
                                </div>
                            </ContentListCard.ListItem>
                        ))}
                    </ContentListCard.List>
                </ContentListCard>

                <ContentListCard>
                    <ContentListCard.CardTitle>Recent Comments</ContentListCard.CardTitle>
                    <ContentListCard.CardContent>Your latest comments and their performance.</ContentListCard.CardContent>
                    <ContentListCard.List>
                        {recentComments.map((comment) => (
                            <ContentListCard.ListItem key={comment.id}>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-foreground">{comment.title}</h3>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                                <Calendar className="w-4 h-4" />
                                                {comment.timestamp}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 hover:bg-muted rounded-md transition-all">
                                            <Check className="w-4 h-4 text-muted-foreground" />
                                        </button>
                                        <button className="p-2 hover:bg-muted rounded-md transition-all">
                                            <Trash2 className="w-4 h-4 text-muted-foreground" />
                                        </button>
                                    </div>
                                </div>
                            </ContentListCard.ListItem>
                        ))}
                    </ContentListCard.List>
                </ContentListCard>
            </div>  
        </div>
    )
}