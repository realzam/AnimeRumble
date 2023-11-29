'use client';

import { useUploadAnime } from '@/hooks/useUploadAnime';
import { AspectRatio } from '@/components/ui/AspectRatio';

const VideoForm = () => {
	const { UploadFileAnime } = useUploadAnime({
		endpoint: 'videoUploader',
	});
	return (
		<div className='mx-auto w-1/2'>
			VideoForm
			<AspectRatio ratio={16 / 9}>
				<UploadFileAnime />
			</AspectRatio>
		</div>
	);
};

export default VideoForm;
