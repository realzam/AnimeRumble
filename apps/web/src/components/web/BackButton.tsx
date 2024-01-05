'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@ui/Button';

const BackButton = () => {
	const router = useRouter();
	return (
		<Button
			className='w-fit shrink-0 text-base'
			variant='ghost'
			onClick={() => {
				router.back();
			}}
		>
			<ArrowLeft className='mr-2' />
			Regresar
		</Button>
	);
};

export default BackButton;
