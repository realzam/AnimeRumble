import { type serverClient } from '@/trpc/client/serverClient';

export type GalleryDataType = Awaited<
	ReturnType<typeof serverClient.rumble.getGallery>
>;

export type SountracksDataType = Awaited<
	ReturnType<typeof serverClient.rumble.getSoundtrack>
>;
