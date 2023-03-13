import { Components, Theme } from '@mui/material/styles';

export const baseComponentsTheme: Components<Omit<Theme, 'components'>> = {
	MuiLink: {
		styleOverrides: {
			root: {
				textDecoration: 'none',
			},
		},
		defaultProps: {
			underline: 'none',
		},
	},
	MuiAppBar: {
		defaultProps: {
			elevation: 0,
			position: 'sticky',
		},
		styleOverrides: {
			root: {
				height: 60,
			},
		},
	},

	MuiTypography: {
		styleOverrides: {
			h1: {
				fontSize: 30,
				fontWeight: 600,
			},
			h2: {
				fontSize: 20,
				fontWeight: 400,
			},
			subtitle1: {
				fontSize: 18,
				fontWeight: 600,
			},
		},
	},

	MuiButton: {
		defaultProps: {
			// variant: 'contained',
			// size: 'small',
			disableElevation: true,
			// color: 'info'
		},
		styleOverrides: {
			root: {
				textTransform: 'none',
				boxShadow: 'none',
				':hover': {
					transition: 'all 0.3s ease-in-out',
				},
			},
		},
	},

	MuiCard: {
		defaultProps: {
			elevation: 0,
		},
	},
};
