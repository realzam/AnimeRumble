import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { IJWTUser } from './interfaces';
import { isValidTokenJose } from './utils/edge';

export async function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname;
	if (pathname.startsWith('/quiz/create')) {
		const tokenCookie = req.cookies.get('token')?.value || '';
		const token = await isValidTokenJose<IJWTUser>(tokenCookie);
		if (!token) {
			return NextResponse.redirect(
				new URL('/auth/login?p=' + pathname, req.url),
			);
		}
		return NextResponse.next();
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/api/quiz/(.)*', '/quiz/create/', '/quiz/create/:id*'],
};
