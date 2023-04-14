import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { IJWTUser } from './interfaces';
import { isValidTokenJose } from './utils/edge';

export async function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname;
	console.log(req.method, pathname);
	if (pathname.startsWith('/api/quiz/') || pathname.startsWith('/admin')) {
		const tokenCookie = req.cookies.get('token')?.value || '';
		const token = await isValidTokenJose<IJWTUser>(tokenCookie);
		if (!token) {
			if (pathname.startsWith('/admin')) {
				return NextResponse.redirect(
					new URL('/auth/login?p=' + req.nextUrl.pathname, req.url),
				);
			}
			return new NextResponse(
				JSON.stringify({ message: 'authentication failed' }),
				{ status: 401, headers: { 'content-type': 'application/json' } },
			);
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
