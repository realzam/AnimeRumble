import Image from 'next/image';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Card } from '@/components/ui/Card';
import { ScrollArea } from '@/components/ui/ScrollArea';

interface Props {
	list: LoteriaCardsDataType;
}
const DevContainer = ({ list }: Props) => {
	return (
		<div className='w-1/2'>
			<ScrollArea className='h-[272px] p-4' type='always'>
				<div className='grid grid-cols-4 gap-2 p-1'>
					{list.map((card) => (
						<Card key={card.id} className='col-span-1 overflow-hidden p-2'>
							<AspectRatio ratio={3 / 5}>
								<div className='relative h-full w-full overflow-hidden rounded-sm'>
									<Image alt='up' src={card.img} fill />
									<div className='absolute bottom-0 w-full rounded-b-sm bg-slate-900/50 px-3 text-center text-xs capitalize text-white backdrop-blur-sm xs:text-sm'>
										{`${card.index}. ${card.title}`}
									</div>
									<div className='absolute left-0 h-full w-full rounded-sm bg-slate-900/70 backdrop-blur-[2px]' />
								</div>
							</AspectRatio>
						</Card>
					))}
				</div>
			</ScrollArea>
		</div>
	);
};
export default DevContainer;
