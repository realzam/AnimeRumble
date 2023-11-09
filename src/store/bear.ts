import { type serverClient } from '@/trpc/client/serverClient';
import { createStore } from 'zustand';

export interface BearProps {
	bears: number;
	quiz: Awaited<ReturnType<typeof serverClient.quizz.getQuizz>>;
}

export interface BearState extends BearProps {
	addBear: () => void;
}

export type BearStore = ReturnType<typeof createBearStore>;

export const createBearStore = (initProps?: Partial<BearProps>) => {
	const DEFAULT_PROPS: BearProps = {
		bears: 0,
		quiz: {
			title: '',
			description: '',
			id: '',
			state: 'draft',
			questions: [],
			img: null,
			imgKey: null,
		},
	};
	return createStore<BearState>()((set) => ({
		...DEFAULT_PROPS,
		...initProps,
		addBear: () => set((state) => ({ bears: ++state.bears })),
	}));
};
