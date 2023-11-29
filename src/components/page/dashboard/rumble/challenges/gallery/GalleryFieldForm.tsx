import React from 'react';
import { type FieldError, type UseFormRegisterReturn } from 'react-hook-form';

import { Input } from '@ui/Input';
import { Label } from '@ui/Label';
import { RadioGroupItem } from '@ui/RadioGroup';

interface Props {
	label: string;
	register: UseFormRegisterReturn;
	id?: string;
	placeholder?: string;
	disabled?: boolean;
	error?: FieldError | undefined;
	errorMessage?: string;
	hasRadioItem?: boolean;
	radioValue?: string;
	errorRadioItem?: boolean;
}

const GalleryFieldForm = ({
	label,
	register,
	id,
	placeholder,
	error,
	errorMessage,
	disabled = false,
	hasRadioItem = false,
	radioValue = '',
	errorRadioItem = false,
}: Props) => {
	return (
		<div className='flex flex-col space-y-1.5'>
			<div className='flex justify-between'>
				<Label className='capitalize' htmlFor={id}>
					{label}
				</Label>
				{hasRadioItem && (
					<div className='flex items-center'>
						<Label className='mr-2 capitalize' htmlFor={id}>
							Respuesta correcta
						</Label>
						<RadioGroupItem
							value={radioValue}
							id='r1'
							className={
								errorRadioItem ? 'animate-pulse border-destructive' : ''
							}
						/>
					</div>
				)}
			</div>
			<Input
				id={id}
				placeholder={placeholder}
				disabled={disabled}
				error={!!error}
				errorMessage={!!error ? errorMessage : undefined}
				{...register}
			/>
		</div>
	);
};

export default GalleryFieldForm;
