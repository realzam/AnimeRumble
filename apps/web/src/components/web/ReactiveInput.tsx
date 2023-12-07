'use client';

import { type Observable, type Selector } from '@legendapp/state';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Memo, Reactive, Show, useComputed } from '@legendapp/state/react';

import { cn } from '@/lib/utils';

type InputHTMLAttributes = React.InputHTMLAttributes<HTMLInputElement>;
type AvalibleInputHTMLAttributes = Omit<InputHTMLAttributes, 'value'>;
export type ReactiveInputProps = {
	value?: Observable<string>;
	className?: string;
	error?: Selector<boolean>;
	errorMessage?: Selector<string>;
} & AvalibleInputHTMLAttributes;

enableReactComponents();

const ReactiveInput = ({
	error,
	value,
	errorMessage,
	className,
	...props
}: ReactiveInputProps) => {
	const errorMessageComputed = useComputed(() => errorMessage);
	const errorComputed = useComputed(() => error);
	return (
		<>
			<Reactive.input
				$className={() =>
					cn(
						'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
						errorComputed.get() &&
							'border-destructive focus-visible:ring-destructive',
						className,
					)
				}
				$value={value}
				{...props}
			/>
			<Show if={errorComputed}>
				<p className='text-[0.8rem] font-medium text-destructive'>
					<Memo>{errorMessageComputed}</Memo>
				</p>
			</Show>
		</>
	);
};
export { ReactiveInput };
