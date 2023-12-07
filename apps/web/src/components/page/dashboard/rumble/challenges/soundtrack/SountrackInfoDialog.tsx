import { AlertCircle } from 'lucide-react';

import { Button } from '@ui/Button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@ui/Dialog';
import { Input } from '@ui/Input';
import { Label } from '@ui/Label';

const SountrackInfoDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' size='icon' type='button'>
					<AlertCircle />
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Infromacion del Sountrack</DialogTitle>
					<DialogDescription>
						Ver la infomacion del Soundtrack
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='name' className='text-right'>
							Name
						</Label>
						<Input id='name' value='Pedro Duarte' className='col-span-3' />
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='username' className='text-right'>
							Username
						</Label>
						<Input id='username' value='@peduarte' className='col-span-3' />
					</div>
				</div>
				<DialogFooter>
					<Button type='button'>Close</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default SountrackInfoDialog;
