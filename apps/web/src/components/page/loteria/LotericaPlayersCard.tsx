import { Memo } from '@legendapp/state/react';

import { cn } from '@/lib/utils';
import usePlayLoteria from '@/hooks/usePlayLoteria';
import usePlayLoteriaUI from '@/hooks/usePlayLoteriaUI';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const LotericaPlayersCard = () => {
	const { playersList } = usePlayLoteriaUI();
	const { userInfo } = usePlayLoteria();
	return (
		<Card className='mx-auto max-w-[80%] shrink-0'>
			<CardHeader className='m-0 py-4'>
				<CardTitle>Jugadores:</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-wrap justify-center p-1'>
				<Memo>
					{() => (
						<>
							{playersList.get().map((player, i) => (
								<span
									key={`${i}-${player}`}
									className={cn(
										'm-3 h-fit rounded-full bg-animePink px-5 py-1 text-white shadow-md',
										userInfo.get()!.nickname === player &&
											'bg-gradient-to-r from-primary via-sakura-darken via-40% to-primary ring-2 ring-primary ring-offset-2',
									)}
								>
									{player}
								</span>
							))}
						</>
					)}
				</Memo>
			</CardContent>
		</Card>
	);
};

export default LotericaPlayersCard;
