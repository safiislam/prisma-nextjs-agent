'use client'
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavLoader({ token }: { token: string }) {
    const pathname = usePathname()
    const hideNavbar = pathname.startsWith("/dashboard");
    return <>
        {!hideNavbar && <Navbar token={token} />}
    </>
}
