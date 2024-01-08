import { Computed } from '@legendapp/state/react';
import { Award, Circle, Trophy, X } from 'lucide-react';

import usePlayQuiz from '@/hooks/usePlayQuiz';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/Card';
import { Separator } from '@/components/ui/Separator';

const ResultsCard = () => {
	const { simpleSumary } = usePlayQuiz();
	return (
		<Computed>
			{() => (
				<Card className='md:col-span-7'>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-7'>
						<CardTitle className='text-2xl font-bold'>Tus Resultados</CardTitle>
						<div className='flex items-center space-x-4'>
							<div className='ml-4 flex items-center space-x-2'>
								<Circle stroke='green' size={28} strokeWidth={3} />
								<div className='text-xl font-semibold'>
									{simpleSumary.corrects.get()}
								</div>
							</div>

							<Separator
								className='h-[32px] w-[2px]'
								orientation='vertical'
								decorative
							/>

							<div className='flex items-center'>
								<X stroke='red' size={32} strokeWidth={3} className='mr-1' />
								<div className='text-xl font-semibold'>
									{simpleSumary.wrong.get()}
								</div>
							</div>
						</div>
						{simpleSumary.place.get() <= 3 && (
							<div className='flex space-x-2 rounded-full bg-gradient-to-r from-primary via-sakura-darken via-40% to-primary px-4 py-2 text-white'>
								<span className='font-semibold'>Estas en el podio</span>
								<Trophy />
							</div>
						)}
					</CardHeader>

					<CardContent className='flex h-3/5 flex-col items-center justify-center'>
						{simpleSumary.accuracy.get() > 80 ? (
							<>
								<Award className='mr-4' stroke='gold' size={50} />
								<div className='flex flex-col items-center'>
									<span className='text-2xl font-semibold text-yellow-400'>
										!Impresionante!
									</span>
									<span className='text-xl'>
										{simpleSumary.score.get()} puntos
									</span>
								</div>
							</>
						) : simpleSumary.accuracy.get() > 60 ? (
							<>
								<Award className='mr-4' stroke='silver' size={50} />
								<div className='flex flex-col items-center'>
									<span className='text-2xl font-semibold text-stone-400'>
										¡Muy bien!
									</span>
									<span className='text-xl'>
										{simpleSumary.score.get()} puntos
									</span>
								</div>
							</>
						) : (
							<>
								<Award className='mr-4' stroke='brown' size={50} />
								<div className='flex flex-col items-center'>
									<span className='text-2xl font-semibold text-yellow-800'>
										¡Buen intento!
									</span>
									<span className='text-xl'>
										{simpleSumary.score.get()} puntos
									</span>
								</div>
							</>
						)}
					</CardContent>
				</Card>
			)}
		</Computed>
	);
};

export default ResultsCard;
