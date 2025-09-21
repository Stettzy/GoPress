"use client";

import { useEffect, useState } from "react";
import { User } from "@/modules/auth/types";

export function useUser() {
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    return {
        user,
    }
}