import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const BingoContainerPage = () => {
	const tags = Array.from({ length: 16 }).map(
		(_, i, a) => `v1.2.0-beta.${a.length - i}`,
	);

	return (
		<div className='container mt-2 max-w-[800px] p-1 xs:p-2'>
			<div className='grid grid-cols-4 gap-1 xs:gap-5'>
				{tags.map((tag) => (
					<Card
						key={tag}
						className='flex h-32 items-center justify-center p-5 text-sm'
					>
						{tag}
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

export default BingoContainerPage;
