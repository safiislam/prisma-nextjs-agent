// 'use client'
import NavLoader from "@/shared/NavLoader";
import { cookies } from "next/headers";
import React from "react";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {

    const token = (await cookies()).get("Authorization")?.value || null;

    return (
        <div>

            <NavLoader token={token as string} />
            {children}
        </div>
    )
}
