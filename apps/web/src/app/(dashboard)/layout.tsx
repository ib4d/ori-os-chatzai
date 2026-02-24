'use client'

import { OriSidebar } from '@/components/ori-sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-ori-black">
            <OriSidebar />
            <main className="flex-1 transition-all duration-300 ml-16 md:ml-64">
                {children}
            </main>
        </div>
    )
}
