import { Components, createTheme, Theme } from '@mui/material/styles';
import { merge } from 'lodash';

import { baseComponentsTheme } from './base-theme';

const lightComponents: Components<Omit<Theme, 'components'>> = {
	MuiAppBar: {
		styleOverrides: {
			root: {
				backgroundColor: 'white',
			},
		},
	},

	MuiButton: {
		styleOverrides: {
			root: {
				':hover': {
					backgroundColor: 'rgba(0,0,0,0.05)',
				},
			},
		},
	},
	MuiCard: {
		styleOverrides: {
			root: {
				boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
			},
		},
	},
};

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#1E1E1E',
		},
		secondary: {
			main: '#3A64D8',
		},
		info: {
			main: '#fff',
		},
	},
	components: merge(baseComponentsTheme, lightComponents),
});
