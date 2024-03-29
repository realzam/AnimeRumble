/** @type {import('tailwindcss').Config} */
import { fontSize, screens } from 'tailwindcss/defaultTheme';
import { withUt } from 'uploadthing/tw';

export default withUt({
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		screens: {
			'3xs': '300px',
			'2xs': '360px',
			xs: '425px',
			'2md': '896px',
			...screens,
		},
		fontSize: {
			'2xs': '0.5rem',
			...fontSize,
		},
		extend: {
			height: {
				all: 'calc(100vh - 3.5rem - 1px)',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					light: 'hsl(var(--primary-light))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				sakura: {
					DEFAULT: 'hsl(var(--sakura))',
					darken: 'hsl(var(--sakura-darken))',
				},
				animePurple: {
					DEFAULT: 'hsl(var(--anime-purple))',
					light: 'hsl(var(--anime-purple-light))',
				},
				animeRed: {
					DEFAULT: 'hsl(var(--anime-red))',
					light: 'hsl(var(--anime-red-light))',
				},
				animeYellow: {
					DEFAULT: 'hsl(var(--anime-yellow))',
					light: 'hsl(var(--anime-yellow-light))',
				},
				animePink: {
					DEFAULT: 'hsl(var(--anime-pink))',
					light: 'hsl(var(--anime-pink-light))',
				},
			},
			letterSpacing: {
				wide: '0.5px',
				wider: '1px',
				widest: '1.5px',
			},
			transitionDuration: {
				600: '600ms',
				2000: '2000ms',
			},
			backgroundPosition: {
				'right-center': 'right center',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'ping-slow': {
					'0%': {
						transform: 'scale(1)',
						opacity: '1',
					},
					'25%': {
						transform: 'scale(2)',
						opacity: '0',
					},
					'100%': {
						transform: 'scale(2)',
						opacity: '0',
					},
				},
				pulse2: {
					'0%, 100%': {
						transform: 'scale(1)',
						'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
					},
					'50%': {
						transform: 'scale(0.95)',
						'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'show-overlay': 'show-overlay 0.6s',
				'ping-slow': 'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) 3s infinite',
				pulse2: 'pulse2 2s 1',
			},
		},
	},
	corePlugins: {
		aspectRatio: false,
	},
	plugins: [require('tailwindcss-animate'), require('tailwindcss-animated')],
});
