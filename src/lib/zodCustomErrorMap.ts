import { z, type StringValidation } from 'zod';

const validation = (vali: StringValidation) => {
	switch (vali) {
		case 'email':
			return 'Correo';
		case 'url':
			return 'Enlace';
		case 'uuid':
			return 'uuid';
		case 'cuid':
			return 'cuid';
		case 'regex':
			return 'Expresión regular';
		case 'datetime':
			return 'Fecha';
		default:
			return vali;
	}
};
export const zodCustomErrorMap: z.ZodErrorMap = (issue, ctx) => {
	if (issue.code === z.ZodIssueCode.too_big) {
		switch (issue.type) {
			case 'array':
				if (issue.exact) {
					return {
						message: `La lista debe contener exactamente ${issue.maximum} elemento(s)`,
					};
				}
				return {
					message: `La lista debe contener ${
						issue.inclusive ? `como máximo` : `menos que`
					} ${issue.maximum} elemento(s)`,
				};
			case 'string':
				if (issue.exact) {
					return {
						message: `El texto debe contener exactamente ${issue.maximum} carácter(es)`,
					};
				}
				return {
					message: `El texto debe contener ${
						issue.inclusive ? `como máximo` : `menos de`
					} ${issue.maximum} carácter(es)`,
				};
			case 'number':
				if (issue.exact) {
					return {
						message: `El número debe ser exactamente ${issue.maximum} carácter(es)`,
					};
				}
				return {
					message: `El número debe ser ${
						issue.inclusive ? `mayor o igual a` : `mayor que`
					} ${issue.maximum}`,
				};
			case 'set':
				return {
					message: 'Entrada inválida',
				};
			case 'date':
				return { message: ctx.defaultError };
		}
	}
	switch (issue.code) {
		case z.ZodIssueCode.invalid_type:
			if (issue.received === 'undefined') {
				return {
					message: 'Requerido',
				};
			} else {
				return {
					message: `Se esperaba  ${issue.expected}, se recibió ${issue.received}`,
				};
			}
		case z.ZodIssueCode.invalid_literal:
			return {
				message: `Valor literal inválido, se esperaba ${issue.expected}`,
			};
		case z.ZodIssueCode.unrecognized_keys:
			return {
				message: `Llave(s) no reconocida(s) en el objeto: ${issue.keys
					.map((k) => `'${k}'`)
					.join(', ')}`,
			};
		case z.ZodIssueCode.invalid_union:
			return {
				message: 'Entrada inválida',
			};
		case z.ZodIssueCode.invalid_union_discriminator:
			return {
				message: `Valor discriminador inválido. Se esperaba ${issue.options
					.map((val) => (typeof val === 'string' ? `'${val}'` : val))
					.join(' | ')}`,
			};
		case z.ZodIssueCode.invalid_enum_value:
			return {
				message: `Valor inválido. Se esperaba ${issue.options
					.map((val) => (typeof val === 'string' ? `'${val}'` : val))
					.join(' | ')}, se recibió '${issue.received}'`,
			};
		case z.ZodIssueCode.invalid_arguments:
			return {
				message: 'Argumentos de función inválidos',
			};
		case z.ZodIssueCode.invalid_return_type:
			return {
				message: 'Tipo de retorno de función inválido',
			};
		case z.ZodIssueCode.invalid_date:
			return {
				message: 'Fecha inválida',
			};
		case z.ZodIssueCode.custom:
			return {
				message: 'Entrada inválida',
			};
		case z.ZodIssueCode.invalid_intersection_types:
			return {
				message: 'Valores de intersección no pudieron ser mezclados',
			};
		case z.ZodIssueCode.not_multiple_of:
			return {
				message: `Número debe ser múltiplo de ${issue.multipleOf}`,
			};
		case z.ZodIssueCode.not_finite:
			return {
				message: 'Número no puede ser infinito',
			};
		case z.ZodIssueCode.invalid_string:
			if (typeof issue.validation === 'object') {
				if ('startsWith' in issue.validation) {
					return {
						message: `Entrada inválida: debe comenzar con " ${issue.validation.startsWith}`,
					};
				} else if ('endsWith' in issue.validation) {
					return {
						message: `Entrada inválida: debe comenzar con " ${issue.validation.endsWith}`,
					};
				}
			}
			if (issue.validation !== 'regex') {
				return {
					message: `${validation(issue.validation)} inválido`,
				};
			} else {
				return {
					message: 'Inválido',
				};
			}
		case z.ZodIssueCode.too_small:
			switch (issue.type) {
				case 'array':
					if (issue.exact) {
						return {
							message: `La lista debe contener exactamente ${issue.minimum} elemento(s)`,
						};
					}
					return {
						message: `La lista debe contener ${
							issue.inclusive ? `al menos` : `más de`
						} ${issue.minimum} elemento(s)`,
					};
				case 'string':
					if (issue.exact) {
						return {
							message: `El texto debe contener exactamente ${issue.minimum} carácter(es)`,
						};
					}
					return {
						message: `El texto debe contener ${
							issue.inclusive ? `al menos` : `más de`
						} ${issue.minimum} carácter(es)`,
					};
				case 'number':
					if (issue.exact) {
						return {
							message: `El número debe ser exactamente ${issue.minimum} carácter(es)`,
						};
					}
					return {
						message: `El número debe ser ${
							issue.inclusive ? `mayor o igual a` : `mayor que`
						} ${issue.minimum}`,
					};
				case 'set':
					return {
						message: 'Entrada inválida',
					};
				case 'date':
					return { message: ctx.defaultError };
			}
		default:
			return { message: ctx.defaultError };
	}
};
