import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

export const LogIn = () => {
    const router = useRouter();
    const session = useSession({ required: true });
    useEffect(() => {
        const trySignIn = async () => {
            if (!session || !session.data) await signIn('github')
        }
        trySignIn().then(() => router.push("/"))
    }, [router, session])

    return (
        <div className="text-center">
            Logging in...
        </div>
    );
}

export default LogIn;