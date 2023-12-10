import { type serverClient } from '@/trpc/client/serverClient';
import { type UseBaseQueryResult } from '@tanstack/react-query';

export type GalleryDataType = Awaited<
	ReturnType<typeof serverClient.rumble.getGallery>
>;

export type SountracksDataType = Awaited<
	ReturnType<typeof serverClient.rumble.getSoundtrack>
>;

export type LoteriaRandomDataType = Awaited<
	ReturnType<typeof serverClient.loteria.getRandomCards>
>;

export type TypeLoteriaRandomQuery = UseBaseQueryResult<
	LoteriaRandomDataType,
	unknown
>;

export type TypeLoteriaRandomQueryProps = Omit<TypeLoteriaRandomQuery, 'data'>;
