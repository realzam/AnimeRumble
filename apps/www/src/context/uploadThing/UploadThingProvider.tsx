'use client';

import React, { useState } from 'react';

import { UploadThingContext } from './UploadThingContext';

interface Props {
	children: React.ReactNode;
}
export const UploadThingProvider = ({ children }: Props) => {
	const [files, setFiles] = useState<File[]>([]);

	return (
		<UploadThingContext.Provider
			value={{
				uploadProps: {
					files,
				},
				setFiles: (el) => {
					setFiles(el);
				},
			}}
		>
			{children}
		</UploadThingContext.Provider>
	);
};
