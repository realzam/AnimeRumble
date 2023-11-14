import { type Session } from 'next-auth';

import { Avatar, AvatarFallback, AvatarImage } from '@ui/Avatar';

interface Props {
	user: Session['user'];
}

const UserAvatar = ({ user }: Props) => {
	return (
		<Avatar>
			<AvatarImage
				src={user.image!}
				alt='profile picture'
				referrerPolicy='no-referrer'
			/>
			<AvatarFallback>OM</AvatarFallback>
		</Avatar>
	);
};

export default UserAvatar;
