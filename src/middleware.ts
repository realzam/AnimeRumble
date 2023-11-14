import { withAuth } from 'next-auth/middleware';

export default withAuth(async function middleware() {});

export const config = { matcher: ['/admin/:path*'] };
