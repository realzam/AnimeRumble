import { withAuth } from 'next-auth/middleware';

export default withAuth(async function middleware() {
	console.log('hola desde el middleware');
});

export const config = { matcher: ['/dashboard/:path*', '/create/:path*'] };
