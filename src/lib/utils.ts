import React from 'react';
import { env } from '@/env.mjs';
import bcrypt from 'bcryptjs';
import { clsx, type ClassValue } from 'clsx';
import Base64 from 'crypto-js/enc-base64';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import sha512 from 'crypto-js/sha512';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function useDOMRef<T extends HTMLElement = HTMLElement>(
	ref?: React.RefObject<T | null> | React.Ref<T | null>,
) {
	const domRef = React.useRef<T>(null);
	React.useImperativeHandle(ref, () => domRef.current);
	return domRef;
}

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function hashPassword(password: string) {
	const hashDigest = sha512(env.AGUA + password);
	const pass = Base64.stringify(
		hmacSHA512(env.FUEGO + hashDigest, env.PASS_KEY),
	);
	return bcrypt.hashSync(pass);
}

export function comparePassword(password: string, compare: string) {
	const hashDigest = sha512(env.AGUA + password);
	const pass = Base64.stringify(
		hmacSHA512(env.FUEGO + hashDigest, env.PASS_KEY),
	);
	return bcrypt.compareSync(pass, compare);
}

export function capitalized(word: string) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export function generarNumerosAleatorios(n: number, min: number, max: number) {
	const numerosAleatorios = new Set<number>();

	while (numerosAleatorios.size < n) {
		const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
		numerosAleatorios.add(numeroAleatorio);
	}

	return Array.from(numerosAleatorios);
}
