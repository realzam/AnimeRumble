import React, { useCallback } from 'react';
import Image from 'next/image';
import { UploadThingContext } from '@/context/uploadThing/UploadThingContext';
import { Show } from '@legendapp/state/react';
import { type FileWithPath } from '@uploadthing/react';
import { useDropzone } from '@uploadthing/react/hooks';
import { UploadCloud, X } from 'lucide-react';
import {
	generateClientDropzoneAccept,
	type UploadFileResponse,
} from 'uploadthing/client';

import { useUploadThing } from '@/lib/uploadthing';
import { AspectRatio } from '@ui/AspectRatio';
import { Button } from '@ui/Button';
import { Card } from '@ui/Card';

interface UploadImageProps {
	isUploading: boolean;
}
const UploadImage = ({ isUploading }: UploadImageProps) => {
	const { uploadProps, setFiles } = React.useContext(UploadThingContext);
	const { files } = uploadProps;
	const onDrop = useCallback(
		(acceptedFiles: FileWithPath[]) => {
			if (!isUploading) {
				setFiles(acceptedFiles);
			}
		},
		[setFiles, isUploading],
	);

	const { getInputProps, getRootProps } = useDropzone({
		onDrop,
		accept: generateClientDropzoneAccept(['image/*']),
		maxFiles: 1,
		multiple: false,
	});

	if (files.length === 0) {
		return (
			<AspectRatio ratio={16 / 9}>
				<Card
					className='flex h-full w-full flex-col items-center justify-center border-2 border-dashed px-6 py-10 text-center'
					{...getRootProps()}
				>
					<UploadCloud size={44} />
					<label
						htmlFor='file-upload'
						className='relative mt-4 flex w-64 cursor-pointer items-center justify-center text-sm font-semibold leading-6 text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2'
					>
						Elegir imagen o arrastrar y soltar
					</label>
					<input className='sr-only' {...getInputProps()} />
					<div className='m-0 h-[1.25rem] text-xs leading-5 text-gray-600'>
						Image (4MB)
					</div>
				</Card>
			</AspectRatio>
		);
	}
	return (
		<Card className='relative overflow-hidden'>
			<AspectRatio
				ratio={16 / 9}
				{...getRootProps()}
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					if (!isUploading) {
						const prop = getRootProps();
						if (prop && prop.onClick) {
							prop.onClick(e);
						}
					}
				}}
			>
				<Image
					alt='up'
					src={URL.createObjectURL(files[0])}
					className='object-cover'
					fill
				/>
				<input className='sr-only' {...getInputProps()} />
			</AspectRatio>
			<Show if={!isUploading}>
				<Button
					size='icon'
					variant='destructive'
					className='absolute right-2 top-2 h-6 w-6 rounded-full p-1 font-bold'
					onClick={() => {
						setFiles([]);
					}}
				>
					<X />
				</Button>
			</Show>
		</Card>
	);
};

interface HookProps {
	onClientUploadComplete?:
		| ((res?: UploadFileResponse[] | undefined) => void)
		| undefined;
}

export const useUploadImage = (props: HookProps) => {
	const { uploadProps, setFiles } = React.useContext(UploadThingContext);
	const {
		startUpload: startUploadThing,
		isUploading,
		permittedFileInfo,
	} = useUploadThing('imageUploader', {
		onClientUploadComplete: (res) => {
			setFiles([]);
			props.onClientUploadComplete?.(res);
			// setUploadProgress(0);
		},
	});

	const { files } = uploadProps;
	const onUploadClick = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault();
		e.stopPropagation();
		if (!files) return;

		void startUploadThing(files);
	};

	const startUpload = () => {
		if (!files) return;
		void startUploadThing(files);
	};
	return {
		UploadImage,
		onUploadClick,
		isUploading,
		permittedFileInfo,
		startUpload,
	};
};
