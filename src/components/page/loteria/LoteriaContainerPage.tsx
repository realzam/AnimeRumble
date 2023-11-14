import { AspectRatio } from '@/components/ui/AspectRatio';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const LoteriaContainerPage = () => {
	const tags = Array.from({ length: 20 }).map(
		(_, i, a) => `v1.2.0-beta.${a.length - i}`,
	);

	return (
		<div className='container mt-2 max-w-[800px] p-1 xs:p-2'>
			<div className='grid grid-cols-4 gap-1 xs:gap-5'>
				{tags.map((tag) => (
					<Card key={tag} className='flex p-2'>
						<AspectRatio ratio={3 / 5}>
							<div className='relative h-full overflow-hidden rounded-sm bg-blue-300'>
								<div className='absolute bottom-0 w-full bg-slate-900/40 text-center text-white'>
									ada
								</div>
							</div>
						</AspectRatio>
					</Card>
				))}
			</div>
			<div className='mt-5'>
				<Button className='mr-5' variant='secondary'>
					Generar
				</Button>
				<Button className='ml-5' variant='destructive'>
					Limpiar
				</Button>
			</div>
		</div>
	);
};

export default LoteriaContainerPage;
