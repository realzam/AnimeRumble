'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import Image from 'next/image';
import { type OurFileRouter } from '@/app/api/uploadthing/core';
import {
	type ObservableArray,
	type ObservablePrimitive,
} from '@legendapp/state';
import {
	Show,
	Switch,
	useComputed,
	useObservable,
	useSelector,
} from '@legendapp/state/react';
import { type DropEvent, type FileWithPath } from '@uploadthing/react';
import { useDropzone } from '@uploadthing/react/hooks';
import {
	type FileRouterInputKey,
	type UploadedFile,
} from '@uploadthing/shared';
import { ArrowUpFromLine, UploadCloud, X } from 'lucide-react';
import ReactPlayer from 'react-player';
import {
	allowedContentTextLabelGenerator,
	generateClientDropzoneAccept,
	generatePermittedFileTypes,
	type UploadFileResponse,
} from 'uploadthing/client';

import { useUploadThing } from '@/lib/uploadthing';
import { cn } from '@/lib/utils';
import { Button } from '@ui/Button';
import { Card } from '@ui/Card';
import ComfirmDeleteAlertDialog from '@/components/web/ComfirmDeleteAlertDialog';
import SimpleAnimeAudioPlayer from '@/components/web/SimpleAnimeAudioPlayer';

interface ContextValue {
	files: ObservableArray<File[]>;
	fileUrl: ObservablePrimitive<string>;
	startUpload: () => void;
	isUploading: ObservablePrimitive<boolean>;
}

const UploadContext = createContext<ContextValue | null>(null);

const useUP = () => useContext(UploadContext)!;

interface UploadImagePropsPrivate {
	fileTypes: FileRouterInputKey[];
	allowedContentText: string;
}

export type UploadAnimeImageFit = 'cover' | 'fill' | 'contain';

export interface UploadImagePropsPublic {
	fit?: UploadAnimeImageFit;
	mode?: 'manual' | 'auto';
	onRemoveFile?: () => void;
	className?: string;
	classNameImage?: string;
	errorMessage?: string;
	error?: boolean;
	disableAffterAddedFile?: boolean;
	onDropAccepted?:
		| (<T extends File>(files: T[], event: DropEvent) => void)
		| undefined;
}

type UploadImageProps = UploadImagePropsPrivate & UploadImagePropsPublic;

const UploadFileAnime = ({
	mode = 'manual',
	onRemoveFile,
	className,
	errorMessage,
	error,
	fileTypes,
	allowedContentText,
	fit = 'contain',
	disableAffterAddedFile = false,
	onDropAccepted,
}: UploadImageProps) => {
	const { files, fileUrl, startUpload, isUploading } = useUP();
	const [disabled, setDisabled] = useState(false);
	const onDrop = async (acceptedFiles: FileWithPath[]) => {
		if (acceptedFiles.length > 0) {
			if (disableAffterAddedFile) {
				setDisabled(true);
			}
			files.set(acceptedFiles);
			fileUrl.set(URL.createObjectURL(acceptedFiles[0]));
			if (mode === 'auto') {
				isUploading.set(true);
				startUpload();
			}
		}
	};
	const showUp = useSelector(() => fileUrl.get() === '');
	const objFit = useMemo(() => {
		switch (fit) {
			case 'contain':
				return 'object-contain';
			case 'fill':
				return 'object-fill';
			case 'cover':
				return 'object-cover';
			default:
				return 'object-contain';
		}
	}, [fit]);

	const showPreview = useSelector(() => fileUrl.get() !== '');
	const isNotUploading = useComputed(() => !isUploading.get());
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: generateClientDropzoneAccept(fileTypes),
		maxFiles: 1,
		multiple: false,
		onError: (e) => {
			console.log('useDropzone error:', e);
		},
		onDropAccepted,
		disabled,
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
						{`Elegir ${fileTypes[0]} o arrastrar y soltar`}
					</label>
					<input className='sr-only' {...getInputProps()} />
					<div className='m-0 h-[1.25rem] text-xs leading-5 text-gray-600'>
						{allowedContentText}
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
					className={cn(
						'relative h-full w-full overflow-hidden',
						className,
						fileTypes[0] === 'audio' && 'border-none',
					)}
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
						<Switch value={fileTypes[0]}>
							{{
								image: () => (
									<Image
										alt='up'
										src={fileUrl.get()}
										className={objFit}
										fill
										priority
									/>
								),
								audio: () => <SimpleAnimeAudioPlayer src={fileUrl.get()} />,
								video: () => (
									<ReactPlayer
										url={fileUrl.get()}
										controls
										config={{
											file: {
												forceVideo: true,
											},
										}}
									/>
								),
								default: () => <>none </>,
							}}
						</Switch>

						{fileTypes[0] !== 'audio' && (
							<input className='sr-only' {...getInputProps()} />
						)}
					</div>
					<Show if={isNotUploading}>
						<ComfirmDeleteAlertDialog
							title='¿Quieres continuar?'
							description={`Al confirmar se eliminara ${
								fileTypes[0] === 'image' ? 'la' : 'el'
							} ${fileTypes[0]} y no se podra recuperar`}
							onConfirm={() => {
								console.log('ComfirmDeleteAlertDialog.onConfirm');
								files.set([]);
								fileUrl.set('');
								if (onRemoveFile) {
									console.log('ComfirmDeleteAlertDialog.onRemoveFile');
									onRemoveFile();
									setDisabled(false);
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
export type TypeUploadthingResponse = UploadFileResponse<UploadedFile>[];
interface HookProps {
	onClientUploadComplete?: ((res: TypeUploadthingResponse) => void) | undefined;
	initialPreview?: string;
	endpoint?: keyof OurFileRouter | undefined;
}

export const useUploadAnime = (props?: HookProps) => {
	const files = useObservable<File[]>([]);
	const fileUrl = useObservable(props?.initialPreview || '');
	const isUploading = useObservable(false);
	const hasFiles = useSelector(() => files.get().length > 0);

	const { startUpload: startUploadThing, permittedFileInfo } = useUploadThing(
		props?.endpoint || 'imageUploader',
		{
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
		},
	);

	const { fileTypes } = generatePermittedFileTypes(permittedFileInfo?.config);
	const allowedContentText = allowedContentTextLabelGenerator(
		permittedFileInfo?.config,
	);
	const startUpload = () => {
		isUploading.set(true);
		if (files.get().length === 0) {
			isUploading.set(false);
			return;
		}
		console.log('startUpload', files.get());

		void startUploadThing(files.get());
	};

	const clearState = () => {
		files.set([]);
		fileUrl.set('');
		isUploading.set(false);
	};
	const setInitialPreview = (preview?: string) => {
		if (preview && preview !== '') {
			fileUrl.set(preview);
		}
	};

	const Component = (props: UploadImagePropsPublic) => (
		<UploadContext.Provider
			value={{
				files,
				fileUrl,
				startUpload,
				isUploading,
			}}
		>
			<UploadFileAnime
				{...props}
				fileTypes={fileTypes}
				allowedContentText={allowedContentText}
			/>
		</UploadContext.Provider>
	);
	return {
		startUpload,
		UploadFileAnime: Component,
		clearState,
		setInitialPreview,
		hasFiles,
	};
};
