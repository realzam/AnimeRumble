import { useReducer } from 'react';

import { UIContext, uiReducer } from './';

interface Props {
	children: JSX.Element | JSX.Element[];
	toggleColorMode: () => void;
}

export interface UIState {
	dialogID: string;
	prop: string;
}

const UI_INITIAL_STATE: UIState = {
	prop: '',
	dialogID: '',
};

export const UIProvider = ({ children, toggleColorMode }: Props) => {
	const [state] = useReducer(uiReducer, UI_INITIAL_STATE);

	return (
		<UIContext.Provider
			value={{
				...state,
				toggleColorMode,
			}}
		>
			{children}
		</UIContext.Provider>
	);
};
