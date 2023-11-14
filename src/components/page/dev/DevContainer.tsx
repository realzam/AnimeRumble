'use client';

import { Memo } from '@legendapp/state/react';

import { useUploadV2 } from '@/hooks/useUploadImage';
import { Button } from '@/components/ui/Button';

const DevContainer = () => {
	const { UploadImage, startUpload } = useUploadV2();
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
