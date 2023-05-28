import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';

import { createEdgeRouter } from 'next-connect';

import { IJWTUser } from './interfaces';
import { isValidTokenJose } from './utils/edge';

const router = createEdgeRouter<NextRequest, NextFetchEvent>();

router.use(async (request, event, next) => {
	console.log(`${request.method} ${request.url}`);
	return next();
});

const isAuthenticated = async (req: NextRequest) => {
	const tokenCookie = req.cookies.get('token')?.value || '';
	const { valid } = await isValidTokenJose<IJWTUser>(tokenCookie);
	return valid;
};

router.use('/admin', async req => {
	if (!(await isAuthenticated(req))) {
		return NextResponse.redirect(
			new URL('/auth/login?p=' + req.nextUrl.pathname, req.url),
		);
	}
	return NextResponse.next();
});

router.use('/api/quiz', async req => {
	if (req.nextUrl.pathname !== '/api/quiz' && !(await isAuthenticated(req))) {
		return new NextResponse(
			JSON.stringify({ message: 'authentication failed' }),
			{ status: 401, headers: { 'content-type': 'application/json' } },
		);
	}
	return NextResponse.next();
});

router.all(() => {
	return NextResponse.next();
});

export async function middleware(req: NextRequest, event: NextFetchEvent) {
	return router.run(req, event);
}

export const config = {
	matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
