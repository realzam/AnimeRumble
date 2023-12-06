import { cn } from '@/lib/utils';
import { Card, CardTitle } from '@/components/ui/Card';

interface Props {
	icon: JSX.Element;
	title: string;
	onClick?: () => void;
	active?: boolean;
}
const ChallengeCard = ({ icon, title, onClick, active = false }: Props) => {
	return (
		<Card
			onClick={() => onClick && onClick()}
			className={cn(
				'flex h-24 w-fit min-w-[80px] cursor-pointer flex-col items-center justify-center space-y-1 px-4 py-2 transition duration-300 hover:scale-105 hover:ring-1 hover:ring-primary',
				active && 'bg-primary text-slate-50',
			)}
		>
			{icon}
			<CardTitle className='text-center capitalize'>{title}</CardTitle>
		</Card>
	);
};

export default ChallengeCard;
