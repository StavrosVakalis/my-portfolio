import { signOut, getSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

export const LogOut = () => {
    const router = useRouter();
    useEffect(() => {
        const trySignOut = async () => {
            const session = await getSession();
            if (session) await signOut();
        }
        trySignOut().then(() => router.push("/"))
    }, [router])

    return (
        <div className="text-center">
            Logging out...
        </div>
    );
}

export default LogOut;