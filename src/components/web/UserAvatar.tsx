import Image from 'next/image';
import { type Session } from 'next-auth';

import { Avatar } from '@ui/Avatar';

interface Props {
	user: Session['user'];
}

const UserAvatar = ({ user }: Props) => {
	return (
		<Avatar>
			{user.image ? (
				<div className='relative aspect-square h-full w-full'>
					<Image
						src={user.image}
						alt='profile picture'
						fill
						referrerPolicy='no-referrer'
					/>
				</div>
			) : (
				<></>
			)}
		</Avatar>
	);
};

export default UserAvatar;
