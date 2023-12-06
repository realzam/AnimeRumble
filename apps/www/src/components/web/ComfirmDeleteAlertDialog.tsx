'use client';

import React from 'react';

// import { Trash2 } from 'lucide-react';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@ui/AlertDialog';

// import { Button } from '@ui/Button';

interface Props {
	onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	title: string;
	description: string;
	children: React.ReactNode;
}
const ComfirmDeleteAlertDialog = ({
	title,
	description,
	onConfirm,
	onCancel,
	children,
}: Props) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className='text-destructive'>
						{title}
					</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={onConfirm}>Continuar</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ComfirmDeleteAlertDialog;
