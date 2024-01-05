'use client';

import HostLoteriaProvider from '@/context/hostLoteria/HostLoteriaProvider';

import { type LoteriaStartLoteriaHostDataType } from '@/types/loteriaQuery';

import HostLoteriaSwitcher from './HostLoteriaSwitcher';

type Props = LoteriaStartLoteriaHostDataType & {
	playersOnline: string[];
};

const LoteriaHostPage = (props: Props) => {
	return (
		<HostLoteriaProvider {...props}>
			<HostLoteriaSwitcher />
		</HostLoteriaProvider>
	);
};

export default LoteriaHostPage;
