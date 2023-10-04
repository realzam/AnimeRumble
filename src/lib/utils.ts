import React from 'react';
import { env } from '@/env.mjs'; // On server
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
