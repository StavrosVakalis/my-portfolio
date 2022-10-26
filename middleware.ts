import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    if (req.url.includes("/edit") && process.env.NODE_ENV !== 'development') {
        return NextResponse.redirect(req.nextUrl.origin);
    }
    NextResponse.next();
}

export const config = {
    matcher: ["/edit"]
}