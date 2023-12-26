import useHostLoteria from '@/hooks/useHostLoteria';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const HostLoteriaPlayersCard = () => {
	const { playersList } = useHostLoteria();
	return (
		<Card className='mx-auto max-w-[80%] shrink-0'>
			<CardHeader className='m-0 py-4'>
				<CardTitle>Jugadores:</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-wrap justify-center p-1'>
				{playersList.map((player, i) => (
					<span
						key={`${i}-${player}`}
						className='m-3 h-fit rounded-full bg-animePink px-5 py-1 text-white shadow-md'
					>
						{player}
					</span>
				))}
			</CardContent>
		</Card>
	);
};

export default HostLoteriaPlayersCard;
