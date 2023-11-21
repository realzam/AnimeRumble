import React from 'react';
import { env } from '@/env.mjs';
import bcrypt from 'bcryptjs';
import { clsx, type ClassValue } from 'clsx';
import Base64 from 'crypto-js/enc-base64';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import sha512 from 'crypto-js/sha512';
import moment from 'moment';
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

export function horasFaltantesHastaFinDelDia(fecha: Date): string[] {
	// Validamos si la fecha es el mismo día que hoy
	const esMismoDiaQueHoy = moment(fecha).isSame(moment(), 'day');

	// Si es el mismo día, utilizamos el momento actual; de lo contrario, utilizamos la fecha proporcionada
	const momentFecha = esMismoDiaQueHoy ? moment() : moment(fecha);

	// Obtenemos la hora actual
	// const horaActual = momentFecha.hours();
	const minutosActuales = momentFecha.minutes();

	// Ajustamos la hora y minutos al siguiente intervalo de 30 minutos si es necesario
	if (minutosActuales > 0) {
		momentFecha.add(30 - minutosActuales, 'minutes');
	}

	// Obtenemos la hora y minutos ajustados
	const horaAjustada = momentFecha.hours();
	const minutosAjustados = momentFecha.minutes();

	// Calculamos los minutos restantes en el día
	const minutosRestantes = (23 - horaAjustada) * 60 + (30 - minutosAjustados);

	// Calculamos la cantidad de intervalos de 30 minutos
	const cantidadIntervalos = Math.ceil(minutosRestantes / 30);

	// Creamos un arreglo para almacenar las horas restantes
	const horasRestantes: string[] = [];

	// Iteramos sobre la cantidad de intervalos y calculamos las horas restantes en cada uno
	for (let i = 0; i < cantidadIntervalos; i++) {
		const minutos = minutosAjustados + i * 30;
		const momentHora = momentFecha.clone().add(minutos, 'minutes');

		// Formateamos la hora y la agregamos al arreglo
		const horaFormateada = momentHora.format('HH:mm');
		horasRestantes.push(horaFormateada);
	}

	return horasRestantes;
}

export function actualizarHora(fecha: Date, hora: string): Date {
	// Parsear la cadena de hora
	const [horaStr, minutosStr] = hora.split(':');
	const nuevaFecha = new Date(fecha);

	// Actualizar la hora y los minutos de la nueva fecha
	nuevaFecha.setHours(Number(horaStr));
	nuevaFecha.setMinutes(Number(minutosStr));

	return nuevaFecha;
}

export function getTimestampFormDate(fecha: Date) {
	return moment(fecha).format('YYYY-MM-DD HH:mm:ss');
}
