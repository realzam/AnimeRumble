'use client';

import { useSocket } from '@/hooks/useSocket';

import { Badge } from '../ui/Badge';

const SocketInicator = () => {
	const { isConnected } = useSocket();

	return (
		<div className='fixed left-1 top-1 z-50'>
			{isConnected ? (
				<Badge variant='outline' className='bg-green-600 text-white'>
					Online
				</Badge>
			) : (
				<Badge variant='outline' className='bg-yellow-600 text-white'>
					Fallback:Polling every 1s
				</Badge>
			)}
		</div>
	);
};

export default SocketInicator;
