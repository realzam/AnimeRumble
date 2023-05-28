import { useState } from 'react';
import NextImage from 'next/image';

type PropsNextImage = React.ComponentProps<typeof NextImage>;

type PropsImage = Omit<PropsNextImage, 'onError' | 'loader' | 'placeholder'>;

interface Props extends PropsImage {
	srcError: string;
	placeholder: string;
}

const Image = ({ srcError, placeholder, ...props }: Props): JSX.Element => {
	const [srcState, setSrc] = useState(props.src);

	const imageLoader = ({ src }: { src: string }) => {
		if (src.includes('public')) {
			const offset = src.indexOf('public');
			return src.slice(6 + offset);
		}
		return `/api/file?path=${src}`;
	};

	return (
		<NextImage
			{...props}
			src={srcState}
			placeholder='blur'
			blurDataURL={placeholder}
			onError={() => setSrc(srcError)}
			loader={imageLoader}
		/>
	);
};

export default Image;
