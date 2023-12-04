import { type ObservableArray } from '@legendapp/state';
import { Memo, useMount, useObservable } from '@legendapp/state/react';

import {
	useUploadAnime,
	type UploadAnimeImageFit,
} from '@/hooks/useUploadAnime';
import TabsImageFit from '@/components/web/TabsImageFit';

interface Props {
	onDropAccepted: <T extends File>(files: T[]) => void;
	onRemoveFile?: (() => void) | undefined;
	startUploadImage: ObservableArray<(() => void)[]>;
	onClientUploadComplete: (img: {
		url: string;
		key: string;
		fit: 'fill' | 'cover' | 'contain';
	}) => void;
}
const AnimeImageSoundtrackForm = ({
	onDropAccepted,
	onRemoveFile,
	startUploadImage,
	onClientUploadComplete,
}: Props) => {
	const fit = useObservable<UploadAnimeImageFit>('cover');
	const { UploadFileAnime, startUpload, clearState } = useUploadAnime({
		onClientUploadComplete: (res) => {
			const img = {
				url: res[0].url,
				key: res[0].key,
				fit: fit.get(),
			};
			onClientUploadComplete(img);
		},
	});

	useMount(() => {
		startUploadImage.get()[0] = startUpload;
		startUploadImage.get()[1] = clearState;
	});

	return (
		<div className='flex flex-col items-center space-y-2 '>
			<p>Imagen del anime (opcional):</p>
			<div className='h-[250px] w-[250px]'>
				<Memo>
					{() => (
						<UploadFileAnime
							className='rounded-md'
							fit={fit.get()}
							onDropAccepted={(files) => onDropAccepted(files)}
							onRemoveFile={onRemoveFile}
						/>
					)}
				</Memo>
			</div>
			<TabsImageFit fit={fit} disabled={false} />
		</div>
	);
};

export default AnimeImageSoundtrackForm;
