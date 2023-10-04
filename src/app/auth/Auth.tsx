import { Card } from '@ui/Card';

import AuthCardContent from './AuthCardContent';

interface Props {
	initialActive?: boolean;
}

const Auth = async ({ initialActive = false }: Props) => {
	return (
		<div className='flex flex-1 items-center justify-center py-0 xs:py-6'>
			<Card className='relative h-[580px] w-full overflow-hidden rounded-none border-none xs:w-[426px] xs:rounded-xl xs:border-solid xs:shadow-2xl sm:w-[550px] md:w-[768px]'>
				<AuthCardContent initialActive={initialActive} />
			</Card>
		</div>
	);
};

export default Auth;
