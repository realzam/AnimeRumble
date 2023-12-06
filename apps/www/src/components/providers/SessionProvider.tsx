'use client';

import { SessionProvider as NextAuthSession } from 'next-auth/react';

interface Props {
	children: React.ReactNode;
}

function SessionProvider({ children }: Props) {
	return <NextAuthSession>{children}</NextAuthSession>;
}

export default SessionProvider;
