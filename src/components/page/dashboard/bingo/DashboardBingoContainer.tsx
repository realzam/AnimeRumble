'use client';

import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	type ColumnDef,
} from '@tanstack/react-table';

import { type BingoReactiveDataType } from '@/types/bingoQuery';
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
		accessorKey: 'description',
		header: 'Descripcción',
	},
	{
		accessorKey: 'response',
		header: 'Respuesta',
	},
];

const DashboardBingoContainer = () => {
	const data: BingoReactiveDataType[] = [
		{ id: 'dd', description: 'hola', response: 'mundo' },
	];
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className='flex h-[calc(100vh-3.5rem-1px)] flex-col items-center'>
			<div className='mt-9 w-[70%]'>
				<Card>
					<CardHeader>
						<CardTitle>Crear pregunta</CardTitle>
						<CardDescription>
							Reactvos para la actividad de bingo
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form>
							<div className='grid w-full items-center gap-4'>
								<div className='flex flex-col space-y-1.5'>
									<Label htmlFor='bingo-description'>Descripcion</Label>
									<Input
										id='bingo-description'
										placeholder='e.g. Historientas de origen japonés ...'
									/>
								</div>
								<div className='flex flex-col space-y-1.5'>
									<Label htmlFor='bingo-response'>Respuesta</Label>
									<Input id='bingo-response' placeholder='...Manga' />
								</div>
							</div>
						</form>
					</CardContent>
					<CardFooter className='flex justify-end'>
						<Button variant='gradient'>agregar</Button>
					</CardFooter>
				</Card>
				<div className='mt-5 '>
					<CardTitle>Reactivos de bingo</CardTitle>
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
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardBingoContainer;
