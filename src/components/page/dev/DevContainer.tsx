'use client';

import { type ObservableObject } from '@legendapp/state';
import { useObservable, useObserve } from '@legendapp/state/react';

import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { ReactiveInput } from '@/components/web/ReactiveInput';

const DevContainer = () => {
	const formState = useObservable({
		question: {
			value: '',
			error: false,
			errorMsg: '',
		},

		option1: {
			value: '',
			error: false,
			errorMsg: '',
		},

		option2: {
			value: '',
			error: false,
			errorMsg: '',
		},

		option3: {
			value: '',
			error: false,
			errorMsg: '',
		},

		option4: {
			value: '',
			error: false,
			errorMsg: '',
		},

		didSave: false,
	});

	useObserve(() => {
		if (formState.didSave.get()) {
			const questionhasError = formState.question.value.get().length < 3;
			formState.question.errorMsg.set(
				questionhasError ? 'Username must be > 3 characters' : '',
			);
			formState.question.error.set(questionhasError);

			const option1hasError = formState.option1.value.get().length < 3;
			formState.option1.errorMsg.set(
				option1hasError ? 'Username must be > 3 characters' : '',
			);
			formState.option1.error.set(option1hasError);

			const option2hasError = formState.option2.value.get().length < 3;
			formState.option2.errorMsg.set(
				option2hasError ? 'Username must be > 3 characters' : '',
			);
			formState.option2.error.set(option2hasError);

			const option3hasError = formState.option3.value.get().length < 3;
			formState.option3.errorMsg.set(
				option3hasError ? 'Username must be > 3 characters' : '',
			);
			formState.option3.error.set(option3hasError);

			const option4hasError = formState.option4.value.get().length < 3;
			formState.option4.errorMsg.set(
				option4hasError ? 'Username must be > 3 characters' : '',
			);
			formState.option4.error.set(option4hasError);
		}
	});

	return (
		<div className='w-1/2 space-y-3 p-4'>
			<FieldForm field={formState.question} label='Pregunta' />
			<FieldForm field={formState.option1} label='opción 1' />
			<FieldForm field={formState.option2} label='opción 2' />
			<FieldForm field={formState.option3} label='opción 3' />
			<FieldForm field={formState.option4} label='opción 4' />
			<Button
				onClick={() => {
					formState.didSave.set(true);
				}}
			>
				show Error
			</Button>
		</div>
	);
};

const FieldForm = ({
	field,
	label,
}: {
	label: string;
	field: ObservableObject<{
		value: string;
		error: boolean;
		errorMsg: string;
	}>;
}) => {
	return (
		<div className='flex flex-col space-y-1.5'>
			<Label className='capitalize' htmlFor='bingo-description'>
				{label}
			</Label>
			<ReactiveInput
				error={field.error}
				value={field.value}
				errorMessage={field.errorMsg}
			/>
		</div>
	);
};
export default DevContainer;
