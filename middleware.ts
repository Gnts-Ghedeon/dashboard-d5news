import { NextResponse } from 'next/server';
export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        '/',
        '/users/:path*',
        '/posts/:path*',
        '/pages/:path*',
        '/podcasts/:path*',
        '/comments/:path*',
        '/settings/:path*',
        '/elements/:path*',
        '/categories/:path*',
        '/ads/:path*',
    ]
};
