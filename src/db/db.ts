import mongoose from 'mongoose';

export async function connect(): Promise<void> {
	if (mongoose.connection.readyState === 1) {
		console.log('Already connected to database!');
		return;
	}

	try {
		const url = process.env.MONGO_URL;
		await mongoose.connect(url);
		console.log(`Connected to database`);
	} catch (err) {
		console.error('Failed to connect to database', err);
	}
}

export async function disconnect(): Promise<void> {
	if (mongoose.connection.readyState === 0) {
		console.log('Not connected to database!');
		return;
	}

	try {
		await mongoose.disconnect();
		console.log('Disconnected from database');
	} catch (err) {
		console.error('Failed to disconnect from database', err);
	}
}
