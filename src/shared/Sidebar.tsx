"use client";

import { Menu, X, Home, Users, Settings, BarChart } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="h-screen">
            {/* Mobile Top Bar */}
            <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
                <h1 className="text-xl font-bold">Dashboard</h1>
                <button onClick={() => setOpen(true)}>
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg z-50
                    transform transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >
                {/* Close Button (Mobile) */}
                <div className="md:hidden flex justify-end p-4">
                    <button onClick={() => setOpen(false)}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Logo */}
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-blue-600">Admin Panel</h2>
                </div>

                {/* Menu Items */}
                <nav className="px-4 space-y-2">
                    <SidebarLink href="/dashboard" label="Home" icon={<Home />} />
                    <SidebarLink href="/dashboard/admin/users" label="Users" icon={<Users />} />
                    <SidebarLink href="/dashboard/analytics" label="Analytics" icon={<BarChart />} />
                    <SidebarLink href="/dashboard/settings" label="Settings" icon={<Settings />} />
                </nav>
            </aside>
        </div>
    );
}

function SidebarLink({
    href,
    label,
    icon,
}: {
    href: string;
    label: string;
    icon: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className="flex text-black items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
            <span className="w-5 h-5">{icon}</span>
            <span className="font-medium">{label}</span>
        </Link>
    );
}
