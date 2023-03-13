import { Components, createTheme, Theme } from '@mui/material';
import { red } from '@mui/material/colors';
import { merge } from 'lodash';

import { baseComponentsTheme } from './base-theme';

const componetsDarkTheme: Components<Omit<Theme, 'components'>> = {
	MuiAppBar: {
		styleOverrides: {
			root: {
				backgroundColor: '#181818',
			},
		},
	},
};

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		secondary: {
			main: '#19857b',
		},
		error: {
			main: red.A400,
		},
	},

	components: merge(baseComponentsTheme, componetsDarkTheme),
});
