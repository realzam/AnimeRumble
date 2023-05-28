import { Components, createTheme, Theme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

import { baseComponentsTheme } from './base-theme';

export const lightThemePalette = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#2B66EF',
		},
		secondary: {
			main: '#D354D3',
		},
		error: {
			main: '#E70000',
		},
		warning: {
			main: '#E5D296',
		},
		success: {
			main: '#19BD69',
		},
		background: {
			paper: '#FFF',
			darker: '#efefef',
			appBar: '#FFF',
			default: '#F2F4F8',
		},
	},
});

const lightComponents: Components<Omit<Theme, 'components'>> = {
	MuiAppBar: {
		styleOverrides: {
			root: {
				backgroundColor: '#FFF',
				boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.13)',
			},
		},
	},
	MuiPaper: {
		variants: [
			{
				props: { variant: 'darken' },
				style: {
					backgroundColor: lightThemePalette.palette.background.darker,
				},
			},
		],
	},

	MuiButton: {
		defaultProps: {
			variant: 'contained',
			color: 'primary',
		},
	},
	MuiCard: {
		styleOverrides: {
			root: {
				boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.13)',
			},
		},
	},
	MuiTypography: {
		defaultProps: {
			color: 'common.black',
		},
	},
};

export const lightTheme = createTheme(
	deepmerge(baseComponentsTheme(lightThemePalette), {
		palette: lightThemePalette.palette,
		components: lightComponents,
	}),
);
