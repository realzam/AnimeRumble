import { Memo, Show, useComputed } from '@legendapp/state/react';
import { Trophy } from 'lucide-react';

import { cn } from '@/lib/utils';
import usePlayLoteriaUI from '@/hooks/usePlayLoteriaUI';
import { Badge } from '@/components/ui/Badge';

const LoteriaPlaceBandge = () => {
	const { placeWinning } = usePlayLoteriaUI();
	const showBadge = useComputed(() => placeWinning.get() > 0);

	const placeInfo = useComputed(() => {
		switch (placeWinning.get()) {
			case 1:
				return [
					'bg-yellow-400 hover:bg-yellow-400 text-black',
					'¡Primer lugar!',
				];
			case 2:
				return [
					'bg-[#D7DAD8] hover:bg-[#D7DAD8] text-black',
					'¡Segundo lugar!',
				];
			default:
				return ['bg-[#732907] hover:bg-[#732907] text-white', '¡Tercer lugar!'];
		}
	});

	return (
		<Show if={showBadge}>
			<Memo>
				{() => (
					<Badge
						className={cn('p-2 text-base shadow-md', placeInfo[0].get())}
						variant='secondary'
					>
						<Trophy size={24} className='mr-3' stroke='currentColor' />
						{placeInfo[1].get()}
					</Badge>
				)}
			</Memo>
		</Show>
	);
};

export default LoteriaPlaceBandge;
