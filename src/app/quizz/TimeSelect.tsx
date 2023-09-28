import * as React from 'react';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@ui/Select';

export function TimeSelect() {
	return (
		<div className='m-2 flex flex-col items-center p-1'>
			<h3 className='mb-2 font-semibold leading-none tracking-tight'>
				Limite Tiempo
			</h3>
			<Select defaultValue='20'>
				<SelectTrigger className='w-[180px]'>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value='5'>5 segundos</SelectItem>
						<SelectItem value='10'>10 segundos</SelectItem>
						<SelectItem value='15'>15 segundos</SelectItem>
						<SelectItem value='20'>20 segundos</SelectItem>
						<SelectItem value='30'>30 segundos</SelectItem>
						<SelectItem value='45'>45 segundos</SelectItem>
						<SelectItem value='60'>60 segundos</SelectItem>
						<SelectItem value='90'>90 segundos</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
