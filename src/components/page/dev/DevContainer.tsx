'use client';

import { Memo } from '@legendapp/state/react';

import { useUploadImage } from '@/hooks/useUploadImage';
import { Button } from '@ui/Button';

const DevContainer = () => {
	const { UploadImage, startUpload } = useUploadImage();
	return (
		<div className='container'>
			<div className='w-[400px]'>
				<UploadImage />
			</div>
			<Memo>
				{() => (
					<Button
						onClick={() => {
							console.log('Button on click');

							startUpload();
						}}
					>
						up
					</Button>
				)}
			</Memo>
		</div>
	);
};

export default DevContainer;
