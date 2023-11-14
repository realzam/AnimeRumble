'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { observable } from '@legendapp/state';
import { Show, useComputed, useObserve } from '@legendapp/state/react';
import { type FileWithPath } from '@uploadthing/react';
import { useDropzone } from '@uploadthing/react/hooks';
import { ArrowUpFromLine, UploadCloud, X } from 'lucide-react';
import {
	generateClientDropzoneAccept,
	type UploadFileResponse,
} from 'uploadthing/client';

import { useUploadThing } from '@/lib/uploadthing';
import { cn } from '@/lib/utils';
import { Card } from '@ui/Card';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Button } from '@/components/ui/Button';
import ComfirmDeleteAlertDialog from '@/components/web/ComfirmDeleteAlertDialog';

interface State {
	files: File[];
	imgUrl: string;
}

interface Props {
	isUploading: boolean;
	startUpload: () => void;
}

interface UploadImageProps {
	mode?: 'manual' | 'auto';
	onRemoveImage?: () => void;
}

const state$ = observable<State>({ files: [], imgUrl: '' });

const UploadImage = ({
	isUploading,
	startUpload,
	mode = 'manual',
	onRemoveImage,
}: Props & UploadImageProps) => {
	const onDrop = (acceptedFiles: FileWithPath[]) => {
		state$.set({
			files: acceptedFiles,
			imgUrl: URL.createObjectURL(acceptedFiles[0]),
		});
		if (mode === 'auto') {
			console.log('mode auto => start upload');

			startUpload();
		}
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: generateClientDropzoneAccept(['image/*']),
		maxFiles: 1,
		multiple: false,
	});

	const showUp = useComputed(() => state$.imgUrl.get().length === 0);
	const showPreview = useComputed(() => state$.imgUrl.get().length > 0);

	useObserve(() => {
		console.log('useObserve.UploadImage isUploading', isUploading);
		console.log('useObserve.UploadImage showUp', showUp.get());
		console.log('useObserve.UploadImage showPreview', showPreview.get());
	});

	useEffect(() => {
		console.log('useEffect.UploadImage', isUploading);
	}, [isUploading]);
	return (
		<div>
			<Show if={showUp}>
				<AspectRatio ratio={16 / 9}>
					<Card
						className={cn(
							'flex h-full w-full flex-col items-center justify-center border-2 border-dashed px-6 py-10 text-center transition-colors duration-300',
							isDragActive && 'border-primary bg-primary/5',
						)}
						{...getRootProps()}
					>
						<UploadCloud size={44} />
						<label
							htmlFor='file-upload'
							className='relative mt-4 flex w-64 cursor-pointer items-center justify-center text-sm font-semibold leading-6 text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2'
						>
							Elegir imagen o arrastrar y soltar.V2
						</label>
						<input className='sr-only' {...getInputProps()} />
						<div className='m-0 h-[1.25rem] text-xs leading-5 text-gray-600'>
							Image (4MB)
						</div>
					</Card>
				</AspectRatio>
			</Show>
			<Show if={showPreview}>
				<Card className='relative overflow-hidden'>
					<AspectRatio
						ratio={16 / 9}
						{...getRootProps()}
						onClick={(e) => {
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
							src={state$.imgUrl.get()}
							className='object-cover'
							fill
						/>
						<input className='sr-only' {...getInputProps()} />
					</AspectRatio>
					<Show if={!isUploading}>
						<ComfirmDeleteAlertDialog
							title='¿Quieres continuar?'
							description='Al confirmar se eliminara la imagen y no se podra recuperar'
							onConfirm={() => {
								state$.set({
									files: [],
									imgUrl: '',
								});
								console.log('ComfirmDeleteAlertDialog.onConfirm');

								if (onRemoveImage) {
									console.log('ComfirmDeleteAlertDialog.onRemoveImage');
									onRemoveImage();
								}
							}}
						>
							<Button
								size='icon'
								variant='destructive'
								className='absolute right-2 top-2 h-6 w-6 rounded-full p-1 font-bold'
							>
								<X />
							</Button>
						</ComfirmDeleteAlertDialog>
					</Show>

					<Show if={isUploading}>
						<div className='absolute inset-0 z-[1] bg-zinc-950/40'></div>
						<span className='absolute left-[calc(50%-20px)] top-[calc(50%-20px)] z-[2] h-10 w-10 animate-bounce rounded-full bg-primary p-2 drop-shadow-lg'>
							<ArrowUpFromLine className='h-full w-full' />
						</span>
					</Show>
				</Card>
			</Show>
		</div>
	);
};

interface HookProps {
	onClientUploadComplete?:
		| ((res?: UploadFileResponse[] | undefined) => void)
		| undefined;
	initialPreview?: string;
}
const useUploadImage = (props?: HookProps | undefined) => {
	const { startUpload: startUploadThing, isUploading } = useUploadThing(
		'imageUploader',
		{
			onClientUploadComplete: props?.onClientUploadComplete,
		},
	);
	state$.imgUrl.set(props?.initialPreview || '');

	const startUpload = () => {
		if (state$.files.get().length === 0) return;
		console.log('startUpload = ()', state$.get());
		void startUploadThing([...state$.files.get()]);
	};
	const clearState = () => {
		state$.set({
			files: [],
			imgUrl: '',
		});
	};

	const A = (props: UploadImageProps) => (
		<UploadImage
			isUploading={isUploading}
			startUpload={startUpload}
			{...props}
		/>
	);

	return {
		UploadImage: A,
		startUpload,
		isUploading,
		clearState,
	};
};
export { useUploadImage };
