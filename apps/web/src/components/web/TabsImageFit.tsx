import React from 'react';
import { type Observable, type Selector } from '@legendapp/state';
import { reactive, useComputed } from '@legendapp/state/react';

import { type UploadAnimeImageFit } from '@/hooks/useUploadAnime';
import { Tabs, TabsList, TabsTrigger } from '@ui/Tabs';

interface Props {
	fit: Observable<UploadAnimeImageFit>;
	disabled: Selector<boolean>;
}

const ReactiveTabs = reactive(Tabs);
const ReactiveTabsTrigger = reactive(TabsTrigger);

const TabsImageFit = ({ fit, disabled }: Props) => {
	const disabledComputed = useComputed(() => disabled);

	return (
		<div className='w-fit'>
			<ReactiveTabs
				$value={fit}
				className='mt-2'
				onValueChange={(v) => {
					fit.set(v as UploadAnimeImageFit);
				}}
			>
				<TabsList>
					<ReactiveTabsTrigger
						$disabled={disabledComputed.get()}
						className='px-3 py-1'
						value='cover'
					>
						Cover
					</ReactiveTabsTrigger>
					<ReactiveTabsTrigger
						$disabled={disabledComputed.get()}
						className='px-3 py-1'
						value='fill'
					>
						Fill
					</ReactiveTabsTrigger>
					<ReactiveTabsTrigger
						$disabled={disabledComputed.get()}
						className='px-3 py-1'
						value='contain'
					>
						Contain
					</ReactiveTabsTrigger>
				</TabsList>
			</ReactiveTabs>
		</div>
	);
};

export default TabsImageFit;
