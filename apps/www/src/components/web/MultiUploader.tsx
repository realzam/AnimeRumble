// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useCallback, useState } from 'react';
// import { type OurFileRouter } from '@/app/api/uploadthing/core';
import { type FileWithPath } from '@uploadthing/react';
import { useDropzone } from '@uploadthing/react/hooks';
// import { Uploader as useUploadThing } from '@/lib/uploadthing';
import { generateClientDropzoneAccept } from 'uploadthing/client';

import { useUploadThing } from '@/lib/uploadthing';

export function MultiUploader() {
	const [files, setFiles] = useState<File[]>([]);
	const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
		setFiles(acceptedFiles);
	}, []);

	const { startUpload, permittedFileInfo } = useUploadThing('imageUploader', {
		onClientUploadComplete: () => {
			alert('uploaded successfully!');
		},
		onUploadError: () => {
			alert('error occurred while uploading');
		},
		onUploadBegin: () => {
			alert('upload has begun');
		},
	});

	const fileTypes = permittedFileInfo?.config
		? Object.keys(permittedFileInfo?.config)
		: [];

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
	});

	return (
		<div {...getRootProps()}>
			<input className='h-20 w-20 bg-slate-600' {...getInputProps()} />
			<div>
				{files.length > 0 && (
					<button onClick={() => startUpload(files)}>
						Upload {files.length} files
					</button>
				)}
			</div>
			Drop files here!
		</div>
	);
}
