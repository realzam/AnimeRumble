import { type Session } from 'next-auth';

import { Avatar, AvatarFallback, AvatarImage } from '@ui/Avatar';

interface Props {
	user: Session['user'];
}

function obtenerIniciales(nombreCompleto: string | undefined | null): string {
	if (!nombreCompleto) {
		return 'SN';
	}
	const articulos = ['el', 'la', 'los', 'las', 'de', 'del'];
	let palabras = nombreCompleto.split(' ');
	palabras = palabras.filter((p) => !articulos.includes(p));
	const iniciales = palabras.map((palabra) => palabra.charAt(0)).join('');
	return iniciales.toUpperCase();
}

const UserAvatar = ({ user }: Props) => {
	return (
		<Avatar>
			<AvatarImage
				src={user.image!}
				alt='profile picture'
				referrerPolicy='no-referrer'
			/>
			<AvatarFallback className='bg-primary text-primary-foreground'>
				{obtenerIniciales(user.name)}
			</AvatarFallback>
		</Avatar>
	);
};

export default UserAvatar;
