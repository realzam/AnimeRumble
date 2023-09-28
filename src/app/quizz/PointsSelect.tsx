import * as React from 'react';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@ui/Select';

export function PointsSelect() {
	return (
		<div className='m-2 flex flex-col items-center p-1'>
			<h3 className='mb-2 font-semibold leading-none tracking-tight'>Puntos</h3>
			<Select defaultValue='standar'>
				<SelectTrigger className='w-[180px]'>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value='standar'>Normales</SelectItem>
						<SelectItem value='none'>Sin puntos</SelectItem>
						<SelectItem value='double'>Puntos Doble</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
