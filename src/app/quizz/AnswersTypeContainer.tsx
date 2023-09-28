import React from 'react';
import { Show, useObservable, useSelector } from '@legendapp/state/react';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@ui/Select';

import { AnswerCard, AnswerTFCard } from './AnswerCard';

const AnswersTypeContainer = () => {
	const type = useObservable('multiple');
	const multiple = useSelector(() => type.get() === 'multiple');
	return (
		<div className='flex flex-col p-1'>
			<div className='mb-2'>
				<Select onValueChange={type.set} defaultValue='multiple'>
					<SelectTrigger className='w-[180px]'>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Tipo de respuesta</SelectLabel>
							<SelectItem value='multiple'>Multiple</SelectItem>
							<SelectItem value='VF'>Verdadero o Falso</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className='mt-2 grid grid-cols-2 gap-4'>
				<Show if={multiple}>
					<AnswerCard />
					<AnswerCard color='blue' />
					<AnswerCard color='yellow' />
					<AnswerCard color='green' />
				</Show>
				<Show if={!multiple}>
					<AnswerTFCard />
					<AnswerTFCard variantTrue={false} />
				</Show>
			</div>
		</div>
	);
};

export default AnswersTypeContainer;
