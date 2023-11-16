import { Memo, useSelector } from '@legendapp/state/react';
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from '@radix-ui/react-icons';

import useLoteria from '@/hooks/useLoteria';
import { Button } from '@ui/Button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@ui/Select';
import {
	Tooltip,
	TooltipArrow,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@ui/Tooltip';

const ListPagination = () => {
	const { ui } = useLoteria();
	const disableAdd = useSelector(() => ui.page.get() === ui.totalPages.get());
	const disableRest = useSelector(() => ui.page.get() === 1);
	return (
		<div className='my-5 flex justify-between'>
			<div className=' flex items-center space-x-2'>
				<p className='text-sm font-medium'>Cartas por página</p>
				<Memo>
					{() => (
						<Select
							value={`${ui.CardsByPage.get()}`}
							onValueChange={(value) => {
								ui.CardsByPage.set(Number(value));
							}}
						>
							<SelectTrigger className='h-8 w-[70px]'>
								<SelectValue placeholder={`${ui.CardsByPage.get()}`} />
							</SelectTrigger>
							<SelectContent side='top'>
								{[8, 12, 16, 24, 32, 40, 48, 56, 66].map((pageSize) => (
									<SelectItem key={pageSize} value={`${pageSize}`}>
										{pageSize}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
				</Memo>
			</div>
			<div className='flex space-x-2'>
				<div className='flex w-[100px] items-center justify-center text-sm font-medium'>
					Página <Memo>{ui.page}</Memo> de <Memo>{ui.totalPages}</Memo>
				</div>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Button
								variant='outline'
								className='h-8 w-8 p-0'
								onClick={() => {
									ui.page.set(1);
								}}
								disabled={disableRest}
							>
								<DoubleArrowLeftIcon />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Ir al inicio</p>
							<TooltipArrow />
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger>
							<Button
								variant='outline'
								className='h-8 w-8 p-0'
								onClick={() => {
									ui.page.set((v) => Math.max(1, v - 1));
								}}
								disabled={disableRest}
							>
								<ChevronLeftIcon />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Atras</p>
							<TooltipArrow />
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger>
							<Button
								variant='outline'
								className='h-8 w-8 p-0'
								onClick={() => {
									ui.page.set((v) => Math.min(ui.totalPages.get(), v + 1));
								}}
								disabled={disableAdd}
							>
								<ChevronRightIcon />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Siguiente</p>
							<TooltipArrow />
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger>
							<Button
								variant='outline'
								className='h-8 w-8 p-0'
								onClick={() => {
									ui.page.set(ui.totalPages.get());
								}}
								disabled={disableAdd}
							>
								<DoubleArrowRightIcon />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Ir al final</p>
							<TooltipArrow />
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	);
};

export default ListPagination;
