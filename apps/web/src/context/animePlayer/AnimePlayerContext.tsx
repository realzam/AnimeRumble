import { createContext } from 'react';
import { type Observable } from '@legendapp/state';

import { type SountracksDataType } from '@/types/rumbleQuery';

export type AnimeTrack = SountracksDataType[0];

interface State {
	tracks: AnimeTrack[];
	currentTrack: AnimeTrack;
	playing: boolean;
	isReady: boolean;
	duration: number;
	position: Observable<number>;
	tracksLength: number;
	trackIndex: number;
	nextSong: () => void;
	previusSong: () => void;
	togglePlayPause: () => void;
	seek: (seconds: number) => void;
	play: () => void;
	pause: () => void;
	stop: () => void;
	clearProgress: () => void;
	playSelectedTrack: (index: number) => void;
	getDurationTrack: (url: string) => number;
}

export const AnimePlayerContext = createContext<State | null>(null);
