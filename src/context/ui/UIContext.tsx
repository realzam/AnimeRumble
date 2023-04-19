import { createContext } from 'react';

interface ContextProps {
	dialogID: string;
	setDialogID: (id: string) => void;
	toggleColorMode: () => void;
}

export const UIContext = createContext({} as ContextProps);
