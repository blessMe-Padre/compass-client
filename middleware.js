// app/middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('jwt')?.value;
    const publicPaths = ['/', '/login', '/register'];
    const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

    // Если нет токена и путь не публичный → редирект на /login
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*'], // Только защищённые пути
};