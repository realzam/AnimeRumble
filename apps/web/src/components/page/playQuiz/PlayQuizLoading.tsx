import React from 'react';

import { Spinner } from '@/components/web/Spinner';

const PlayQuizLoading = () => {
	return (
		<div className='flex h-all flex-col items-center justify-center'>
			<div className='h-24 w-24'>
				<Spinner />
			</div>
			<div className='m-2 text-xl'>Cargando...</div>
		</div>
	);
};

export default PlayQuizLoading;
