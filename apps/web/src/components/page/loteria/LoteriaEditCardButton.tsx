import { Pencil } from 'lucide-react';

import usePlayLoteriaUI from '@/hooks/usePlayLoteriaUI';
import { Button } from '@/components/ui/Button';

interface Props {
	id: string;
}

const LoteriaEditCardButton = ({ id }: Props) => {
	const { openChangeCardDialog } = usePlayLoteriaUI();
	return (
		<Button
			className='absolute right-2 top-2 z-10 h-7 w-7 rounded-full p-[6px] text-white hover:scale-[1.05] hover:bg-purple-600 xs:-right-4 xs:-top-4 xs:h-9 xs:w-9'
			onClick={() => openChangeCardDialog(id)}
		>
			<Pencil className='h-full w-full' />
		</Button>
	);
};

export default LoteriaEditCardButton;
