import { createContext } from 'react';

interface ContextProps {
	toggleColorMode: () => void;
}

export const UIContext = createContext({} as ContextProps);
