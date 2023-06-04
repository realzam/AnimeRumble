import RegisterForm from '@/components/auth/registerForm';
import { MainLayout } from '@/layouts';

const RegisterPage = () => {
	return (
		<MainLayout title='Anime Rumble|Register'>
			<RegisterForm />
		</MainLayout>
	);
};

export default RegisterPage;
