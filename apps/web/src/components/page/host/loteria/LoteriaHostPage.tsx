'use client';

import PlayLoteriaAdminProvider from '@/context/playLoteriaAdmin/PlayLoteriaAdminProvider';
import SocketProvider from '@/context/socket/SocketProvider';

import { type LoteriaGameDataType } from '@/types/loteriaQuery';

import LoteriaHostContainer from './LoteriaHostContainer';

const LoteriaHostPage = ({}: LoteriaGameDataType) => {
	return (
		<SocketProvider>
			<PlayLoteriaAdminProvider>
				<LoteriaHostContainer />
			</PlayLoteriaAdminProvider>
		</SocketProvider>
	);
};

export default LoteriaHostPage;
