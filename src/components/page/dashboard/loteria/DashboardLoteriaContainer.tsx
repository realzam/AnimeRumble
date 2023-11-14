'use client';

import { useUploadV2 } from '@/hooks/useUploadImage';
import { AspectRatio } from '@ui/AspectRatio';
import { Button } from '@ui/Button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@ui/Card';
import { Input } from '@ui/Input';
import { Label } from '@ui/Label';
import { ScrollArea } from '@ui/ScrollArea';

const DashboardLoteriaContainer = () => {
	const tags = Array.from({ length: 20 }).map(
		(_, i, a) => `v1.2.0-beta.${a.length - i}`,
	);

	const { UploadImage } = useUploadV2();
	return (
		<div className='h-[calc(100vh-3.5rem-1px)]'>
			<ScrollArea className='w-full'>
				<div className='flex h-[calc(100vh-3.5rem-1px)] flex-col items-center'>
					<div className='mt-9 w-[70%]'>
						<Card className='mx-auto grid w-[80%] grid-cols-4'>
							<div className='col-span-2 m-2'>
								<AspectRatio ratio={3 / 5}>
									<UploadImage />
								</AspectRatio>
							</div>
							<div className='col-span-2 flex flex-col justify-center'>
								<CardHeader>
									<CardTitle>Agregar Carta</CardTitle>
									<CardDescription>Informacio de la carta</CardDescription>
								</CardHeader>
								<CardContent>
									<form>
										<div className='grid w-full items-center gap-4'>
											<div className='flex flex-col space-y-1.5'>
												<Label htmlFor='bingo-description'>Descripcion</Label>
												<Input id='loteria-title' placeholder='e.g. El agua' />
											</div>
										</div>
									</form>
								</CardContent>
								<CardFooter className='flex justify-end'>
									<Button variant='gradient'>agregar</Button>
								</CardFooter>
							</div>
						</Card>
						<div className='mt-5 '>
							<CardTitle>Cartas de loteria</CardTitle>
							<div className='mt-5'>
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
							</div>
						</div>
					</div>
				</div>
			</ScrollArea>
		</div>
	);
};

export default DashboardLoteriaContainer;
