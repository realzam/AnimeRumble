'use client';

import { useState } from 'react';
import { useSelector } from '@legendapp/state/react';
import {
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
	type ColumnDef,
	type ColumnFiltersState,
	type Table as Ta,
} from '@tanstack/react-table';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { type BingoReactiveDataType } from '@/types/bingoQuery';
import useBingo from '@/hooks/useBingo';
import { Button } from '@ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/Card';
import { Input } from '@ui/Input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@ui/Select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@ui/Table';

const columns: ColumnDef<BingoReactiveDataType>[] = [
	{
		accessorKey: 'index',
		header: 'ID',
	},
	{
		accessorKey: 'description',
		header: 'Descripcción',
	},
	{
		accessorKey: 'response',
		header: 'Respuesta',
	},
];

const BingoTable = () => {
	const { reactives } = useBingo();
	const data = useSelector(() => reactives.get());
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		debugTable: true,
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			columnFilters,
		},
	});

	return (
		<Card className='my-5'>
			<CardHeader>
				<CardTitle>Reactivos de bingo</CardTitle>
				<div className='flex items-center py-4'>
					<Input
						placeholder='buscar descripcción ...'
						value={
							(table.getColumn('description')?.getFilterValue() as string) ?? ''
						}
						onChange={(event) =>
							table.getColumn('description')?.setFilterValue(event.target.value)
						}
						className='max-w-sm'
					/>
				</div>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter>
				<DataTablePagination table={table} />
			</CardFooter>
		</Card>
	);
};

interface DataTablePaginationProps<TData> {
	table: Ta<TData>;
}

function DataTablePagination<TData>({
	table,
}: DataTablePaginationProps<TData>) {
	return (
		<div className='w-full'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center space-x-2'>
					<p className='text-sm font-medium'>Reactivos por página</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger className='h-8 w-[70px]'>
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side='top'>
							{[5, 10, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='text-sm font-medium'>
					Página {table.getState().pagination.pageIndex + 1} de{' '}
					{table.getPageCount()}
				</div>
				<div className='flex items-center space-x-2'>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex'
						onClick={() => table.setPageIndex(0)}
						disabled={!table.getCanPreviousPage()}
					>
						<span className='sr-only'>Go to first page</span>
						<DoubleArrowLeftIcon className='h-4 w-4' />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<span className='sr-only'>Go to previous page</span>
						<ChevronLeftIcon className='h-4 w-4' />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<span className='sr-only'>Go to next page</span>
						<ChevronRightIcon className='h-4 w-4' />
					</Button>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex'
						onClick={() => table.setPageIndex(table.getPageCount() - 1)}
						disabled={!table.getCanNextPage()}
					>
						<span className='sr-only'>Go to last page</span>
						<DoubleArrowRightIcon className='h-4 w-4' />
					</Button>
				</div>
			</div>
		</div>
	);
}

export default BingoTable;
