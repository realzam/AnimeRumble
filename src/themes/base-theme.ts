import { createTheme, Theme } from '@mui/material/styles';

export const baseComponentsTheme = ({ palette, breakpoints }: Theme) =>
	createTheme({
		components: {
			MuiLink: {
				styleOverrides: {
					root: {
						textDecoration: 'none',
						transition: 'all 0.3s ease-in-out',
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
					disableElevation: true,
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

			MuiTabs: {
				styleOverrides: {
					root: {
						backgroundColor: palette.background.appBar,
						borderRadius: '99px',
						// minHeight: 44,
						width: 'fit-content',
						padding: '3px',
						boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.13)',
						marginBottom: 15,
					},
					flexContainer: {
						display: 'inline-flex',
						position: 'relative',
						zIndex: 1,
					},
					scroller: {
						[breakpoints.up('md')]: {
							padding: '0 8px',
						},
					},
					indicator: {
						top: 3,
						bottom: 3,
						right: 3,
						height: 'auto',
						background: 'none',
						transition: 'all 0.3s ease-out',
						'&:after': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							left: 4,
							right: 4,
							bottom: 0,
							borderRadius: 99,
							// backgroundColor: palette.mode === 'light' ? '#fff' : palette.action.selected,
							backgroundColor: palette.mode === 'light' ? '#e8eaf6' : '#2d2d2f',
							// boxShadow: '0 4px 4px 0 rgba(0,0,0,0.16)',
						},
					},
				},
			},
			MuiTab: {
				styleOverrides: {
					textColorPrimary: {
						color: palette.text.primary,
					},
					root: {
						'&:hover': {
							opacity: 1,
						},
						minHeight: 44,
						minWidth: 96,
						[breakpoints.up('md')]: {
							minWidth: 120,
						},
					},
					wrapped: {
						zIndex: 2,
						// marginTop: spacing(0.5),
						// color: palette.text.primary,
						textTransform: 'initial',
					},
				},
			},

			MuiListItemButton: {
				styleOverrides: {
					root: {
						borderRadius: '4px',
						padding: 3,
						margin: '3px 5px',
						// backgroundColor: palette.background.darker,
						'&.Mui-selected': {
							backgroundColor: palette.primary.main,
							color: 'white',
							'& > div.MuiListItemIcon-root': {
								color: 'white',
							},
							'&:hover': {
								backgroundColor: palette.primary.dark,
							},
						},
					},
				},
			},

			MuiCard: {
				styleOverrides: {
					root: {
						p: 2,
						borderRadius: '8px',
					},
				},
				defaultProps: {
					elevation: 0,
				},
			},
		},
	});
