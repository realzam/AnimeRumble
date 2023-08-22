import React from 'react';
import { clsx, type ClassValue } from 'clsx';
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
