import { redirect } from 'next/navigation';

import { getAuthSession } from '@/lib/nextauth';
import animeRumbleRoutes from '@/lib/routes';
import { Card } from '@ui/Card';
import AuthCardContent from '@/components/page/auth/AuthCardContent';

const RegisterPage = async () => {
	const session = await getAuthSession();

	if (session?.user) {
		if (session.user.role == 'admin') {
			redirect(animeRumbleRoutes.dashboard);
		}
		redirect(animeRumbleRoutes.home);
	}
	return (
		<div className='flex flex-1 items-center justify-center py-0 xs:py-6'>
			<Card className='relative h-[580px] w-full overflow-hidden rounded-none border-none xs:w-[426px] xs:rounded-xl xs:border-solid xs:shadow-2xl sm:w-[550px] md:w-[768px]'>
				<AuthCardContent isRegisterFocus />
			</Card>
		</div>
	);
};

export default RegisterPage;