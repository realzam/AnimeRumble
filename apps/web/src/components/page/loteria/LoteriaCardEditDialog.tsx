import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { Show } from '@legendapp/state/react';
import { Pencil, Search } from 'lucide-react';

import { cn, quitarAcentos } from '@/lib/utils';
import usePlayLoteriaUI from '@/hooks/usePlayLoteriaUI';
import { Dialog, DialogContent, DialogTrigger } from '@ui/Dialog';
import { ScrollArea } from '@ui/ScrollArea';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

interface Props {
	id: string;
}

const LoteriaCardEditDialog = ({ id }: Props) => {
	const { searchList, replaceCard } = usePlayLoteriaUI();
	const [search, setSearch] = useState('');

	const clearText = useCallback((text: string) => {
		return text.toLowerCase().trim().replace(/\s+/g, '');
	}, []);

	const list = useMemo(
		() =>
			searchList.filter((c) =>
				c.titleSearch.includes(clearText(quitarAcentos(search))),
			),
		[search, searchList, clearText],
	);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='absolute right-2 top-2 z-10 h-7 w-7 rounded-full p-[6px] text-white hover:scale-[1.05] hover:bg-purple-600 xs:-right-4 xs:-top-4 xs:h-9 xs:w-9'>
					<Pencil className='h-full w-full' />
				</Button>
			</DialogTrigger>
			<DialogContent className='p-0 sm:max-w-[500px]'>
				<div className='relative h-12'>
					<Search className='absolute left-3 top-4 h-4 w-4' />
					<Input
						value={search}
						onChange={(v) => setSearch(v.target.value)}
						className='h-12 rounded-none border-0 border-b-2 px-9 focus-visible:border-primary focus-visible:ring-0'
					/>
				</div>
				<ScrollArea className='h-[272px] p-4' type='always'>
					<div className='grid grid-cols-4 gap-2 p-1'>
						{list.map((card) => (
							<Card
								key={card.id}
								className={cn(
									'flex select-none shadow-lg xs:p-2',
									!card.disable &&
										'cursor-pointer transition-all duration-300 xs:hover:ring-1 xs:hover:ring-primary',
								)}
								onClick={() => {
									console.log('click replace card');

									if (!card.disable) {
										console.log('execute replace card', id, card.id);

										replaceCard(id, card.id);
									}
								}}
							>
								<AspectRatio ratio={3 / 5}>
									<Image
										alt='up'
										src={card.img}
										className={cn(
											'rounded-sm',
											card.fit === 'cover' ? 'object-cover' : 'object-fit',
										)}
										fill
										priority
									/>

									<div className='xs:text-sm absolute bottom-0 w-full bg-slate-900/50 px-3 text-center text-xs capitalize text-white backdrop-blur-sm'>
										{`${card.index}. ${card.title}`}
									</div>
									<Show if={card.disable}>
										<div className='absolute h-full w-full rounded-sm bg-slate-900/70 backdrop-blur-[2px]' />
									</Show>
								</AspectRatio>
							</Card>
						))}
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

export default LoteriaCardEditDialog;
