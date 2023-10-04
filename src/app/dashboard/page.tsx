'use client';

import React from 'react';
import { signOut, useSession } from 'next-auth/react';

const DashboardPage = () => {
	const { data: session, status } = useSession();

	console.log(session, status);

	return (
		<div className='flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-y-10'>
			<h1 className='text-3xl font-bold'>Profile</h1>

			<pre className='bg-zinc-800 p-4'>
				{JSON.stringify(
					{
						session,
						status,
					},
					null,
					2,
				)}
			</pre>

			<button
				className='mb-2 block bg-zinc-800 px-4 py-2'
				onClick={() => {
					signOut();
				}}
			>
				Signout
			</button>
		</div>
	);
};

export default DashboardPage;
