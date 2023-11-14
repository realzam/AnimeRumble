import { Avatar, AvatarFallback, AvatarImage } from '@ui/Avatar';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@ui/Select';

const ConfigUserRole = () => {
	return (
		<div className='flex items-center justify-between space-x-4'>
			<div className='flex items-center space-x-4'>
				<Avatar>
					<AvatarImage src='/avatars/01.png' />
					<AvatarFallback>OM</AvatarFallback>
				</Avatar>
				<div>
					<p className='text-sm font-medium leading-none'>Sofia Davis</p>
					<p className='text-sm text-muted-foreground'>m@example.com</p>
				</div>
			</div>

			<Select>
				<SelectTrigger className='w-[180px]'>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Tipo de Rol</SelectLabel>
						<SelectItem value='Multiple'>Coordinador</SelectItem>
						<SelectItem value='TF'>Miembro</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

export default ConfigUserRole;
