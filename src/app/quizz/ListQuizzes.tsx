import { IconMenuOrder } from '@tabler/icons-react';

import { Card, CardContent, CardTitle } from '@ui/Card';
import { ScrollArea } from '@ui/ScrollArea';

const TAGS = Array.from({ length: 20 }).map(
	(_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

const ListQuizzes = () => {
	return (
		<ScrollArea>
			<div className='px-5 py-4'>
				<div className='text-violet-400'>{`${TAGS.length} preguntas`}</div>
				{TAGS.map((tag) => (
					<Card key={tag} className='mt-3'>
						<CardContent className='flex items-center p-0'>
							<div className='flex  w-full flex-col items-center '>
								<div className='mt-5 shrink-0'>
									<CardTitle>{tag}</CardTitle>
								</div>
								<div className='w-full flex-1'>
									<div className='grid grid-cols-2 gap-2 p-5'>
										<div className='h-5 border border-red-500' />
										<div className='h-5 border border-blue-500' />
										<div className='h-5 border border-yellow-500' />
										<div className='h-5 border border-green-500' />
									</div>
								</div>
							</div>
							<IconMenuOrder className='mr-2 shrink-0' />
						</CardContent>
					</Card>
				))}
			</div>
		</ScrollArea>
	);
};

export default ListQuizzes;
