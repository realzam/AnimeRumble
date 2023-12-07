import { type ObservableArray } from '@legendapp/state';
import { useMount } from '@legendapp/state/react';
import { type DropEvent } from '@uploadthing/react';
import { type Json, type UploadThingError } from '@uploadthing/shared';
import { type FieldError } from 'react-hook-form';

import {
	useUploadAnime,
	type TypeUploadthingResponse,
} from '@/hooks/useUploadAnime';

interface Props {
	error?: FieldError | undefined;
	onDropAccepted?:
		| (<T extends File>(files: T[], event: DropEvent) => void)
		| undefined;
	onRemoveFile?: (() => void) | undefined;
	startUploadTrack: ObservableArray<(() => void)[]>;
	onClientUploadComplete?: ((res: TypeUploadthingResponse) => void) | undefined;
	disabled?: boolean;
	onUploadError?: ((e: UploadThingError<Json>) => void) | undefined;
}

const AnimeTrackSoundtrackForm = ({
	onDropAccepted,
	error,
	onRemoveFile,
	startUploadTrack,
	onClientUploadComplete,
	disabled = false,
	onUploadError,
}: Props) => {
	const { UploadFileAnime, startUpload, clearState } = useUploadAnime({
		endpoint: 'audioUploader',
		onClientUploadComplete,
		onUploadError,
	});

	useMount(() => {
		startUploadTrack.get()[0] = startUpload;
		startUploadTrack.get()[1] = clearState;
	});

	return (
		<div className='w-full space-y-2'>
			<p>Soundtrack:</p>
			<div className='h-[110px] w-full'>
				<UploadFileAnime
					className='rounded-md'
					disableAffterAddedFile
					onDropAccepted={onDropAccepted}
					error={!!error}
					errorMessage={
						!!error ? 'Es necesario agregar un Soundtrack' : undefined
					}
					onRemoveFile={onRemoveFile}
					disabled={disabled}
				/>
			</div>
		</div>
	);
};

export default AnimeTrackSoundtrackForm;
