'use client'
import Navbar from "@/shared/Navbar";
import React from "react";
import { usePathname } from "next/navigation";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const hideNavbar = pathname.startsWith("/dashboard");

    return (
        <div>
            {!hideNavbar && <Navbar />}
            {children}
        </div>
    )
}
