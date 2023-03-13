import { UIState } from './';

interface Actions {
	type: 'UI.ActionName';
}

export const uiReducer = (state: UIState, action: Actions): UIState => {
	switch (action.type) {
		case 'UI.ActionName':
			return { ...state };

		default:
			return state;
	}
};
