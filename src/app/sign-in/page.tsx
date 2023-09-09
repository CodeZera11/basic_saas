"use client";

import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation";

const SignInPage = () => {

    const session = useSession();

    if (session.status === "loading") {
        return (
            <div className="flex items-center justify-center w-full h-screen text-5xl">Loading...</div>
        )
    }

    if (session.status === "authenticated") {
        redirect("/dashboard")
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-40 border-2 border-white text-white flex flex-col gap-5">
                <h1 className="text-6xl mb-5">Sign In</h1>
                <button onClick={() => signIn("discord", { callbackUrl: "/dashboard" })} className="bg-[#5764F2] w-full text-xl text-black py-2 px-4 rounded-xl">Sign in using Discord</button>
            </div>
        </div>
    )
}

export default SignInPage