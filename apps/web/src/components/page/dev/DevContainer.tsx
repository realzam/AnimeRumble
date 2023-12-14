'use client';

import { useMount } from '@legendapp/state/react';
import { io } from 'socket.io-client';

import { Button } from '@/components/ui/Button';

const DevContainer = () => {
	useMount(() => {
		console.log('page loaded');

		// Create a socket connection
		setTimeout(() => {
			console.log('start connect to socket');

			const socket = io('http://localhost:4000/loteria', {
				transports: ['websocket', 'polling'],
				autoConnect: true,
				forceNew: true,
			});

			// Listen for incoming messages
			socket.on('connect', () => {
				console.log('hola mundo');
			});

			socket.on('connect_error', (err) => {
				console.log(`connect_error due to ${err.message}`);
			});

			socket.onAny((erros, args) => {
				console.log('onAny', erros, args);
			});
		}, 5000);
		// Clean up the socket connection on unmount
		// return () => {
		// 	socket.disconnect();
		// };
	});

	return (
		<div className='mx-auto mt-8 flex w-52 flex-col items-center space-y-5'>
			<div className='text-lg font-semibold capitalize'>counter: 0</div>
			<div className='flex w-full justify-between'>
				<Button onClick={() => {}}>+1</Button>
				<Button onClick={() => {}}>reset</Button>
				<Button onClick={() => {}}>-1</Button>
			</div>
		</div>
	);
};
export default DevContainer;
