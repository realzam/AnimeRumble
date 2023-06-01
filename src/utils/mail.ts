import path from 'path';

import Email from 'email-templates';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const sendMail = async (to: string, subject: string, email: string) => {
	if (
		!process.env.GOOGLE_CLIENT_ID ||
		!process.env.GOOGLE_CLIENT_SECRET ||
		!process.env.GOOGLE_REDIRECT_URI ||
		!process.env.GOOGLE_REFRESH_TOKEN
	) {
		throw new Error('Varaibles de Google no configuradas');
	}
	const oAuth2Client = new google.auth.OAuth2(
		process.env.GOOGLE_CLIENT_ID,
		process.env.GOOGLE_CLIENT_SECRET,
		process.env.GOOGLE_REDIRECT_URI,
	);
	oAuth2Client.setCredentials({
		refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
	});
	try {
		const accessToken = await oAuth2Client.getAccessToken();

		const tranport = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				type: 'OAUTH2',
				user: 'anime.rumble.app@gmail.com',
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
				accessToken: accessToken.token || '',
			},
		});

		const result = await tranport.sendMail({
			from: 'AnimeRumble',
			to,
			subject,
			html: email,
		});
		console.log('sendmail', result);

		return result;
	} catch (error) {
		console.log('error sendmail', error);
	}
};

export const sendVerifyEmail = (name: string, to: string, url: string) => {
	const email = new Email();
	email
		.render(path.join(process.cwd(), 'src', 'emails', 'verify', 'email.pug'), {
			name,
			url,
		})
		.then(async email => {
			console.log('sendVerifyEmail');
			console.log(email);

			await sendMail(to, 'verifyEmail', email);
		})
		.catch(console.error);
};

export const sendRecoveryEmail = (name: string, to: string, url: string) => {
	const email = new Email();
	email
		.render(
			path.join(process.cwd(), 'src', 'emails', 'recovery', 'email.pug'),
			{
				url,
			},
		)
		.then(async email => {
			console.log('sendVerifyEmail');
			console.log(email);

			await sendMail(to, 'verifyEmail', email);
		})
		.catch(console.error);
};
