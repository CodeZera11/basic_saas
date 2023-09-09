"use client";
import { SessionProvider } from "next-auth/react"

export default function SignInLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="text-white">
            <SessionProvider>
                {children}
            </SessionProvider>
        </div>
    )
}