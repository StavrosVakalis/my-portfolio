import { signIn, getSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

export const LogIn = () => {
    const router = useRouter();
    useEffect(() => {
        const trySignIn = async () => {
            const session = await getSession();
            if (!session) await signIn('github')
        }
        trySignIn().then(() => router.push("/"))
    }, [router])

    return (
        <div className="text-center">
            Logging in...
        </div>
    );
}

export default LogIn;