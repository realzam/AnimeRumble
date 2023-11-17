'use client';

import { useSelector } from '@legendapp/state/react';
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	type ColumnDef,
} from '@tanstack/react-table';

import { type BingoReactiveDataType } from '@/types/bingoQuery';
import useBingo from '@/hooks/useBingo';
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

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		debugTable: true,
	});

	return (
		<div className='mt-5 rounded-md border'>
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
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className='h-24 text-center'>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
};

export default BingoTable;
