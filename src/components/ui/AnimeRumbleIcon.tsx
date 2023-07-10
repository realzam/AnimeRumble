import Image, { type ImageProps } from 'next/image';

const AnimeRumbleIcon = (
	props: Omit<ImageProps, 'alt' | 'src'>,
): JSX.Element => {
	return (
		<div className='relative'>
			<Image
				className='hidden dark:block'
				alt='AnimeRumbleIcon'
				src='/anime_rumble_icon_light.svg'
				{...props}
			/>
			<Image
				className='dark:hidden'
				alt='AnimeRumbleIcon'
				src='/anime_rumble_icon.svg'
				{...props}
			/>
		</div>
	);
};

export default AnimeRumbleIcon;
