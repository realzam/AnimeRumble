'use client';

import { createContext, useContext } from 'react';
import Image from 'next/image';
import {
	type ObservableArray,
	type ObservablePrimitive,
} from '@legendapp/state';
import {
	Computed,
	Show,
	useComputed,
	useObservable,
	useSelector,
} from '@legendapp/state/react';
import { type FileWithPath } from '@uploadthing/react';
import { useDropzone } from '@uploadthing/react/hooks';
import { ArrowUpFromLine, UploadCloud, X } from 'lucide-react';
import {
	generateClientDropzoneAccept,
	type UploadFileResponse,
} from 'uploadthing/client';

import { useUploadThing } from '@/lib/uploadthing';
import { cn } from '@/lib/utils';
import { Button } from '@ui/Button';
import { Card } from '@ui/Card';
import ComfirmDeleteAlertDialog from '@/components/web/ComfirmDeleteAlertDialog';

interface ContextValue {
	files: ObservableArray<File[]>;
	imgUrl: ObservablePrimitive<string>;
	startUpload: () => void;
	isUploading: ObservablePrimitive<boolean>;
}

const UploadContext = createContext<ContextValue | null>(null);

const useUP = () => useContext(UploadContext)!;

interface UploadImageProps {
	mode?: 'manual' | 'auto';
	onRemoveImage?: () => void;
	className?: string;
	classNameImage?: string;
	errorMessage?: string;
	error?: boolean;
}

const UploadImage = ({
	mode = 'manual',
	onRemoveImage,
	className,
	errorMessage,
	error,
	classNameImage,
}: UploadImageProps) => {
	const { files, imgUrl, startUpload, isUploading } = useUP();
	const onDrop = (acceptedFiles: FileWithPath[]) => {
		files.set(acceptedFiles);
		imgUrl.set(URL.createObjectURL(acceptedFiles[0]));
		if (mode === 'auto') {
			isUploading.set(true);
			startUpload();
		}
	};
	const showUp = useSelector(() => imgUrl.get() === '');
	const showPreview = useSelector(() => imgUrl.get() !== '');
	const isNotUploading = useComputed(() => !isUploading.get());
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: generateClientDropzoneAccept(['image/*']),
		maxFiles: 1,
		multiple: false,
	});

	return (
		<>
			<Show if={showUp}>
				<Card
					className={cn(
						'flex h-full w-full flex-col items-center justify-center border-2 border-dashed px-6 py-10 text-center text-primary transition-colors duration-300 dark:text-primary-light',
						isDragActive && 'border-primary bg-primary/5',
						className,
						error && 'animate-pulse2 rounded-md border-destructive',
					)}
					{...getRootProps()}
				>
					<UploadCloud size={44} />
					<label
						htmlFor='file-upload'
						className='relative mt-4 flex w-64 cursor-pointer items-center justify-center text-sm font-semibold leading-6 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2'
					>
						Elegir imagen o arrastrar y soltar
					</label>
					<input className='sr-only' {...getInputProps()} />
					<div className='m-0 h-[1.25rem] text-xs leading-5 text-gray-600'>
						Image (4MB)
					</div>
					{errorMessage && (
						<div className='m-3 h-[1.25rem] animate-pulse text-base leading-5 text-destructive'>
							{errorMessage}
						</div>
					)}
				</Card>
			</Show>
			<Show if={showPreview}>
				<Card
					className={cn('relative h-full w-full overflow-hidden', className)}
				>
					<div
						{...getRootProps()}
						onClick={(e) => {
							if (!isUploading.get()) {
								const prop = getRootProps();
								if (prop && prop.onClick) {
									prop.onClick(e);
								}
							}
						}}
					>
						<Computed>
							{() => (
								<Image
									alt='up'
									src={imgUrl.get()}
									className={classNameImage || 'object-cover'}
									fill
								/>
							)}
						</Computed>
						<input className='sr-only' {...getInputProps()} />
					</div>
					<Show if={isNotUploading}>
						<ComfirmDeleteAlertDialog
							title='¿Quieres continuar?'
							description='Al confirmar se eliminara la imagen y no se podra recuperar'
							onConfirm={() => {
								console.log('ComfirmDeleteAlertDialog.onConfirm');
								files.set([]);
								imgUrl.set('');
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
							<ArrowUpFromLine className='h-full w-full text-white' />
						</span>
					</Show>
				</Card>
			</Show>
		</>
	);
};

interface HookProps {
	onClientUploadComplete?:
		| ((res?: UploadFileResponse[] | undefined) => void)
		| undefined;
	initialPreview?: string;
}

export const useUploadImage = (props?: HookProps) => {
	const files = useObservable<File[]>([]);
	const imgUrl = useObservable(props?.initialPreview || '');
	const isUploading = useObservable(false);
	const hasFiles = useSelector(() => files.get().length > 0);

	const { startUpload: startUploadThing } = useUploadThing('imageUploader', {
		onUploadBegin: () => {
			isUploading.set(true);
		},
		onClientUploadComplete: (res) => {
			isUploading.set(false);
			if (props && props.onClientUploadComplete) {
				props.onClientUploadComplete(res);
			}
		},
		onUploadError: () => {
			isUploading.set(false);
		},
	});

	const startUpload = () => {
		isUploading.set(true);
		if (files.get().length === 0) {
			isUploading.set(false);
			return;
		}
		void startUploadThing(files.get());
	};

	const clearState = () => {
		files.set([]);
		imgUrl.set('');
		isUploading.set(false);
	};

	const Component = (props: UploadImageProps) => (
		<UploadContext.Provider
			value={{
				files,
				imgUrl,
				startUpload,
				isUploading,
			}}
		>
			<UploadImage {...props} />
		</UploadContext.Provider>
	);
	return {
		startUpload,
		UploadImage: Component,
		clearState,
		setInitialPreview: imgUrl.set,
		hasFiles,
	};
};
