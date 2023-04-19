import { UIState } from './';

type Actions =
	| { type: 'UI.Action'; payload: boolean }
	| { type: 'UI.SetDialogID'; payload: string };

export const uiReducer = (state: UIState, action: Actions): UIState => {
	switch (action.type) {
		case 'UI.SetDialogID':
			return { ...state, dialogID: action.payload };

		default:
			return state;
	}
};
