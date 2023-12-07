import { Spinner } from '@/components/web/Spinner';

const PlayQuizShowPrelude = () => {
	return (
		<div className='flex h-[calc(100vh-3.5rem-1px)] flex-col items-center justify-center'>
			<div className='h-10 w-10'>
				<Spinner />
			</div>
		</div>
	);
};

export default PlayQuizShowPrelude;
