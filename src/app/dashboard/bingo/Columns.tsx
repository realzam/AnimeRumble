'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { type ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	// DropdownMenuRadioGroup,
	// DropdownMenuRadioItem,
	// DropdownMenuSeparator,
	// DropdownMenuShortcut,
	// DropdownMenuSub,
	// DropdownMenuSubContent,
	// DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Payment {
	reactive: string;
	answer: string;
}

export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: 'reactive',
		header: () => 'Pregunta',
	},
	{
		accessorKey: 'answer',
		header: 'Respuesta',
	},
	{
		id: 'actions',
		cell: () => <DataTableRowActions />,
	},
];

export function DataTableRowActions() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
				>
					<DotsHorizontalIcon className='h-4 w-4' />
					<span className='sr-only'>Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-[160px]'>
				<DropdownMenuItem>Edit</DropdownMenuItem>
				<DropdownMenuItem>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
