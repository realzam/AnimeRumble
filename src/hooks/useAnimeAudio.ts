'use client';

import { useContext } from 'react';
import { AnimePlayerContext } from '@/context/animePlayer/AnimePlayerContext';

const useAnimeAudio = () => {
	const state = useContext(AnimePlayerContext);
	if (!state) throw new Error('Missing LoteriaContex.Provider in the tree');
	return state;
};

export default useAnimeAudio;
