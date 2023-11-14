import React from 'react';

interface ContextValue {
	uploadProps: {
		files: File[];
	};
	setFiles: (el: File[]) => void;
}

export const UploadThingContext = React.createContext<ContextValue>({
	uploadProps: {
		files: [],
	},
	setFiles: () => {
		console.log('MenuContext::setFiles');
	},
});
