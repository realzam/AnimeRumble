import { Memo, useSelector } from '@legendapp/state/react';
import { Trophy } from 'lucide-react';

import { cn } from '@/lib/utils';
import usePlayLoteriaUI from '@/hooks/usePlayLoteriaUI';
import { AlertDialog, AlertDialogOverlay } from '@/components/ui/AlertDialog';

const LoteriaWinner = () => {
	const { showLoteriaWinnerDialog, placeWinning } = usePlayLoteriaUI();

	const placeInfo = useSelector(() => {
		switch (placeWinning.get()) {
			case 1:
				return ['text-yellow-400', 'gold', '¡Primer lugar!'];
			case 2:
				return ['text-stone-400', 'silver', '¡Segundo lugar!'];
			default:
				return ['text-yellow-800', 'brown', '¡Tercer lugar!'];
		}
	});

	return (
		<Memo>
			{() => (
				<AlertDialog open={showLoteriaWinnerDialog.get()}>
					<AlertDialogOverlay>
						<div
							className={cn(
								'text-br flex h-full w-full animate-wiggle flex-col items-center justify-center space-y-2 text-2xl animate-duration-1000 animate-infinite animate-ease-in-out',
								placeInfo[0],
							)}
						>
							<div>¡Felicidades!</div>
							<Trophy size={124} stroke={placeInfo[1]} />
							<div>{placeInfo[2]}</div>
						</div>
					</AlertDialogOverlay>
				</AlertDialog>
			)}
		</Memo>
	);
};

export default LoteriaWinner;
