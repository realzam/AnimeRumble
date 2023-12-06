import { useContext } from 'react';
import { SocketContext } from '@/context/socket/SocketContext';

export const useSocket = () => {
	const state = useContext(SocketContext);
	if (!state) throw new Error('Missing SocketContext.Provider in the tree');
	return state;
};
