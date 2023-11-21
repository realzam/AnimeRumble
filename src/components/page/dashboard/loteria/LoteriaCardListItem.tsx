import { useMemo } from 'react';
import Image from 'next/image';

import { type LoteriaCardDataType } from '@/types/loteriaQuery';
import useLoteria from '@/hooks/useLoteria';
import { AspectRatio } from '@ui/AspectRatio';
import { Card } from '@ui/Card';

interface Props {
	card: LoteriaCardDataType;
}
const LoteriaCardListItem = ({ card }: Props) => {
	const { refForm } = useLoteria();
	const fitClass = useMemo(
		() => (card.fit === 'cover' ? 'object-cover' : 'object-fit'),
		[card],
	);
	return (
		<Card
			onClick={() => {
				refForm.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
					inline: 'nearest',
				});
			}}
			className='flex cursor-pointer p-2 transition-all ease-in-out hover:scale-105 hover:border-primary'
		>
			<AspectRatio ratio={3 / 5}>
				<div className='relative h-full overflow-hidden rounded-sm '>
					<Image alt='up' src={card.img} className={fitClass} fill />
					<div className='absolute bottom-0 w-full bg-slate-900/60 text-center text-white'>
						{`${card.index}. ${card.title}`}
					</div>
				</div>
			</AspectRatio>
		</Card>
	);
};

export default LoteriaCardListItem;
