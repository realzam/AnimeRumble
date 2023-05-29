import { google } from 'googleapis';
import nodemailer from 'nodemailer';

export const sendMail = async () => {
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
		console.log('accessToken', accessToken.token);

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
			to: 'sza0210escom@gmail.com',
			subject: 'HellofromGmalAPI',
			text: 'GOALDODSAADO',
		});
		console.log('sendmail', result);

		return result;
	} catch (error) {
		console.log('error sendmail', error);
	}
};
