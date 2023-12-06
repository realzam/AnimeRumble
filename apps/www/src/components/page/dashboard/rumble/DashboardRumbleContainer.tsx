'use client';

import { Memo, Switch, useObservable } from '@legendapp/state/react';
import {
	CloudDrizzle,
	Clover,
	Image as ImgIcon,
	Music,
	Sword,
	Swords,
	Video,
} from 'lucide-react';

import ChallengeCard from './ChallengeCard';
import {
	BadLuckContainer,
	GalleryContainer,
	GoodLuckContainer,
	JigsawContainer,
	RetoContainer,
	SoundtrackContainer,
	VideoContainer,
	VSContainer,
} from './challenges';

const Jigsaw = () => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path
				d='m11 3a2.35 2.35 0 0 0-2.35 2.35 2.35 2.35 0 0 0 0.601 1.57h-3.73c-0.867 0-1.57 0.698-1.57 1.57v3.74a2.35 2.35 0 0 1 1.57-0.614 2.35 2.35 0 0 1 2.35 2.35 2.35 2.35 0 0 1-2.35 2.35 2.35 2.35 0 0 1-1.57-0.614v3.74c0 0.867 0.698 1.57 1.57 1.57h3.73a2.35 2.35 0 0 1-0.601-1.57 2.35 2.35 0 0 1 2.35-2.35 2.35 2.35 0 0 1 2.35 2.35 2.35 2.35 0 0 1-0.601 1.57h3.73c0.867 0 1.57-0.698 1.57-1.57v-3.73a2.35 2.35 0 0 0 1.57 0.601 2.35 2.35 0 0 0 2.35-2.35 2.35 2.35 0 0 0-2.35-2.35 2.35 2.35 0 0 0-1.57 0.601v-3.73c0-0.867-0.698-1.57-1.57-1.57h-3.73a2.35 2.35 0 0 0 0.601-1.57 2.35 2.35 0 0 0-2.35-2.35z'
				fill='none'
				strokeWidth='2'
			/>
		</svg>
	);
};

type ChallengesEnum =
	| 'Gallery'
	| 'Video'
	| 'Soundtrack'
	| 'Rompecabeza'
	| 'GoodLuck'
	| 'BadLuck'
	| 'Reto'
	| 'VS';

const DashboardRumbleContainer = () => {
	const value = useObservable<ChallengesEnum>('Gallery');
	const onClick = (val: ChallengesEnum) => {
		value.set(val);
	};
	return (
		<div className='mx-auto p-3'>
			<div className='flex justify-center space-x-3'>
				<Memo>
					{() => (
						<ChallengeCard
							title='Galeria'
							icon={<ImgIcon />}
							onClick={() => onClick('Gallery')}
							active={value.get() === 'Gallery'}
						/>
					)}
				</Memo>

				<Memo>
					{() => (
						<ChallengeCard
							title='Video'
							icon={<Video />}
							onClick={() => onClick('Video')}
							active={value.get() === 'Video'}
						/>
					)}
				</Memo>

				<Memo>
					{() => (
						<ChallengeCard
							title='Soundtrack'
							icon={<Music />}
							onClick={() => onClick('Soundtrack')}
							active={value.get() === 'Soundtrack'}
						/>
					)}
				</Memo>
				<Memo>
					{() => (
						<ChallengeCard
							title='Rompecabeza'
							icon={<Jigsaw />}
							onClick={() => onClick('Rompecabeza')}
							active={value.get() === 'Rompecabeza'}
						/>
					)}
				</Memo>
				<Memo>
					{() => (
						<ChallengeCard
							title='Buena Suerte'
							icon={<Clover />}
							onClick={() => onClick('GoodLuck')}
							active={value.get() === 'GoodLuck'}
						/>
					)}
				</Memo>
				<Memo>
					{() => (
						<ChallengeCard
							title='Mala Suerte'
							icon={<CloudDrizzle />}
							onClick={() => onClick('BadLuck')}
							active={value.get() === 'BadLuck'}
						/>
					)}
				</Memo>
				<Memo>
					{() => (
						<ChallengeCard
							title='Reto'
							icon={<Sword />}
							onClick={() => onClick('Reto')}
							active={value.get() === 'Reto'}
						/>
					)}
				</Memo>
				<Memo>
					{() => (
						<ChallengeCard
							title='Vs'
							icon={<Swords />}
							onClick={() => onClick('VS')}
							active={value.get() === 'VS'}
						/>
					)}
				</Memo>
			</div>
			<Switch value={value}>
				{{
					Gallery: () => <GalleryContainer />,
					Video: () => <VideoContainer />,
					Soundtrack: () => <SoundtrackContainer />,
					Rompecabeza: () => <JigsawContainer />,
					GoodLuck: () => <GoodLuckContainer />,
					BadLuck: () => <BadLuckContainer />,
					Reto: () => <RetoContainer />,
					VS: () => <VSContainer />,
					default: () => <>None</>,
				}}
			</Switch>
		</div>
	);
};

export default DashboardRumbleContainer;
