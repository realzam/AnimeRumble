// import { withAuth } from 'next-auth/middleware';

import { NextResponse } from 'next/server';

// export default withAuth(async function middleware() {
// 	console.log('hola desde el middleware');
// });

// export const config = { matcher: ['/dashboard/:path*', '/create/:path*'] };

function middleware() {
	NextResponse.next();
}
export default middleware;
