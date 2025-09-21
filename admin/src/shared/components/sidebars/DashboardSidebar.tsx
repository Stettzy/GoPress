"use client";

import Link from "next/link";
import { useUser } from "@/modules/auth/hooks/useUser";
import { useAuth } from "@/modules/auth";
import {
    LayoutDashboardIcon,
    ImageIcon,
    FileTextIcon,
    FolderIcon,
    TagIcon,
    CogIcon,
    UserIcon,
    LogOutIcon,
    ChevronUpIcon
} from "lucide-react";


const sidebarItems = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboardIcon,
    },
    {
        label: "Media",
        href: "/admin/media",
        icon: ImageIcon,
    },
    
    {
        label: "Articles",
        href: "/admin/articles",
        icon: FileTextIcon,
    },
    
    {
        label: "Categories",
        href: "/admin/categories",
        icon: FolderIcon,
    },
    
    {
        label: "Tags",
        href: "/admin/tags",
        icon: TagIcon,
    },

    {
        label: "Users",
        href: "/admin/users",
        icon: UserIcon,
    },
    
    {
        label: "Settings",
        href: "/admin/settings",
        icon: CogIcon
    }
]

export function DashboardSidebar() {
    const { logout } = useAuth();
    const { user } = useUser();

    return (
        <div className="w-64 h-screen bg-sidebar p-4 text-sidebar-foreground flex flex-col">
            <div className="mb-8 bg-sidebar-muted p-2 rounded-lg text-center">
                <h2 className="text-3xl font-semibold">GoPress</h2>
            </div>
            <ul className="space-y-2">
                {sidebarItems.map((item) => (
                    <li key={item.href} className="rounded-lg hover:bg-sidebar-muted/50 transition-colors duration-200">
                        <Link href={item.href} className="flex items-center gap-3 p-3 text-background hover:text-background/90 transition-colors duration-200">
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="mt-auto pt-4 border-t border-sidebar-muted">
                {user && (
                    <div className="relative group">
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-muted/50 cursor-default">

                            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-lg">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-sidebar-foreground truncate">
                                    {user.username}
                                </p>
                                <p className="text-xs text-sidebar-foreground/70 truncate">
                                    {user.email}
                                </p>
                            </div>
                            
                            <ChevronUpIcon className="w-4 h-4 text-sidebar-foreground/50 group-hover:text-sidebar-foreground transition-colors" />
                        </div>
                        
                        {/* Dropdown menu */}
                        <div className="absolute bottom-full left-0 right-0 mb-2 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="p-1">
                                <button 
                                    onClick={logout}
                                    className="w-full cursor-pointer flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted/30 rounded-md transition-colors"
                                >
                                    <LogOutIcon className="w-4 h-4" />
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}