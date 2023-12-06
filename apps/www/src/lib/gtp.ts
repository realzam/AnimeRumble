'server-only';

import { env } from '@/env.mjs';
import { OpenAI } from 'openai';

const openai = new OpenAI({
	apiKey: env.OPENAI_API_KEY,
	dangerouslyAllowBrowser: true,
});

export async function strict_output(user_prompt: string) {
	const system_prompt = `Genera un quiz en español sobre animes con 10 preguntas. Las preguntas pueden ser de opción múltiple (con cuatro opciones) o verdadero/falso. La longitud de cada respuesta para las opciones múltiples no debe superar las 15 palabras. Almacena las preguntas y respuestas en un formato JSON.

	El formato JSON debe seguir esta estructura:
	{"title": "Título del quiz", "description": "Descripción del quiz", "questions": [{"question": "Pregunta", "questionType": "Multiple", "answers": ["Opción 1", "Opción 2", "Opción 3", "Opción 4"], "correctAnswers": "Respuesta correcta"}]}
	
	Para preguntas de opción múltiple, especifica el tipo como "Multiple" y proporciona las opciones y la respuesta correcta. Para preguntas de verdadero/falso, usa "TF" y la respuesta correcta.
	
	Asegúrate de que al menos 3 preguntas sean de verdadero/falso y evita preguntas abiertas en este formato.
	
	Ejemplo de JSON:
	{"title": "Your Lie in April", "description": "Quiz del anime Your Lie in April", "questions": [{"question": "¿Qué instrumento toca Kaori?", "questionType": "Multiple", "answers": ["piano", "flauta", "violín", "armónica"], "correctAnswer": "violín"}, {"question": "¿Kaori tiene el cabello negro?", "questionType": "TF", "correctAnswer": false}]}
	`;

	const response = await openai.chat.completions.create({
		temperature: 1,
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'system',
				content: system_prompt,
			},
			{ role: 'user', content: user_prompt },
		],
	});

	let res: string =
		response.choices[0].message?.content?.replace(/'/g, '"') ?? '';

	// ensure that we don't replace away apostrophes in text
	res = res.replace(/(\w)"(\w)/g, "$1'$2");

	console.log('System prompt:', system_prompt);
	console.log('\nUser prompt:', user_prompt);
	console.log('\nGPT response:', res);

	return res;
}
