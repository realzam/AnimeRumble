import { redirect } from 'next/navigation';

import { getAuthSession } from '@/lib/nextauth';
import animeRumbleRoutes from '@/lib/routes';
import { Card } from '@ui/Card';
import AuthCardContent from '@/components/page/auth/AuthCardContent';

const RegisterPage = async () => {
	const session = await getAuthSession();

	if (session?.user && session.user.nickName) {
		console.log('account is loggin, redirect to next page from server');
		if (session.user.role == 'admin') {
			redirect(animeRumbleRoutes.dashboard);
		}
		redirect(animeRumbleRoutes.home);
	}
	return (
		<div className='flex flex-1 items-center justify-center py-0 xs:py-6'>
			<Card className='relative h-[620px] w-full overflow-hidden rounded-none border-none xs:w-[426px] xs:rounded-xl xs:border-solid xs:shadow-2xl sm:w-[550px] md:w-[768px]'>
				<AuthCardContent isRegisterFocus />
			</Card>
		</div>
	);
};

export default RegisterPage;
