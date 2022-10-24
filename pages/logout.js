import { signOut, getSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

export const LogOut = () => {
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        const trySignOut = async () => {
            if (session && session.data) await signOut();
        }
        trySignOut().then(() => router.push("/"))
    }, [router, session])

    return (
        <div className="text-center">
            Logging out...
        </div>
    );
}

export default LogOut;