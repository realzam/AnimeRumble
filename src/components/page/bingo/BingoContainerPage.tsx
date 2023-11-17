'use client';

import { trpc } from '@/trpc/client/client';
import { ScrollArea } from '@radix-ui/react-scroll-area';

import { type BingoReactivesDataType } from '@/types/bingoQuery';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface Props {
	reactives: BingoReactivesDataType;
}
const BingoContainerPage = ({ reactives }: Props) => {
	const { data, refetch } = trpc.bingo.getRandomReactives.useQuery(undefined, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		enabled: false,
		initialData: reactives,
	});
	return (
		<ScrollArea className='h-full' type='always'>
			<div className='container mt-2 max-w-[800px] p-1 xs:p-2'>
				<div className='grid grid-cols-4 gap-0 xs:gap-5'>
					{data.map((reactive) => (
						<Card
							key={reactive.id}
							className='flex h-28 items-center justify-center p-5 text-center text-sm'
						>
							{reactive.response}
						</Card>
					))}
				</div>
				<div className='mt-5 flex justify-center'>
					<Button
						className='mr-5'
						variant='secondary'
						onClick={() => {
							refetch();
						}}
					>
						Generar
					</Button>
					<Button className='ml-5' variant='destructive'>
						Limpiar
					</Button>
				</div>
			</div>
		</ScrollArea>
	);
};

export default BingoContainerPage;

/*

return (
		<div className='container mt-2 max-w-[800px] p-1 xs:p-2'>
			<div className='grid grid-cols-4 gap-1 xs:gap-5'>
				{reactives.map((reactive) => (
					<Card
						key={reactive.id}
						className='flex h-32 items-center justify-center p-5 text-sm'
					>
						{reactive.response}
					</Card>
				))}
			</div>
			<div className='mt-5'>
				<Button className='mr-5' variant='secondary'>
					Generar
				</Button>
				<Button className='ml-5' variant='destructive'>
					Limpiar
				</Button>
			</div>
		</div>
	);
	
	*/
