import { Components, createTheme, Theme } from '@mui/material';
import { deepmerge } from '@mui/utils';

import { baseComponentsTheme } from './base-theme';

const darkThemePalette = createTheme({
	palette: {
		mode: 'dark',
		common: {
			black: '#0C0C0F',
			white: '#F5F5FA',
		},
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
			paper: '#202020',
			darker: '#151515',
			appBar: '#181818',
		},
	},
});

const componetsDarkTheme: Components<Omit<Theme, 'components'>> = {
	MuiAppBar: {
		styleOverrides: {
			root: {
				backgroundColor: '#181818',
			},
		},
	},
	MuiTypography: {
		defaultProps: {
			color: 'common.white',
		},
	},
	MuiButton: {
		defaultProps: {
			variant: 'contained',
			color: 'primary',
		},
	},
	MuiPaper: {
		variants: [
			{
				props: { variant: 'darken' },
				style: {
					backgroundColor: darkThemePalette.palette.background.darker,
				},
			},
		],
	},
	MuiCard: {
		styleOverrides: {
			root: {
				boxShadow: '0px 2px 2px rgba(255,255,255,0.01)',
			},
		},
	},
};

const dark = createTheme({
	palette: darkThemePalette.palette,
	components: componetsDarkTheme,
});

export const darkTheme = createTheme(
	deepmerge(baseComponentsTheme(dark), dark),
);
