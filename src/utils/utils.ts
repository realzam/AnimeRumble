import fs from 'fs';
import path from 'path';

import formidable from 'formidable';
import imageType from 'image-type';
import jwt from 'jsonwebtoken';
import { readChunk } from 'read-chunk';

import { IJWTUser } from '@/interfaces';

const saveFormidableFile = async (
	file: formidable.File,
	destinationPath: string,
	filePath: string,
) => {
	const parentDirectory = path.join(process.cwd(), 'files', destinationPath);
	fs.mkdirSync(parentDirectory, { recursive: true });
	fs.renameSync(file.filepath, filePath);
};

export const singToken = (
	payload: string | object | Buffer,
	expiresIn?: string | number,
) => {
	if (!process.env.JWT_SECRET_SEED) {
		throw new Error('No hay semilla de JWT - Revisar varibles de entorno');
	}
	return jwt.sign(payload, process.env.JWT_SECRET_SEED, {
		expiresIn: expiresIn || '7d',
	});
};

export const isValidToken = (
	token: string,
): Promise<[false, jwt.VerifyErrors] | [true, IJWTUser]> => {
	if (!process.env.JWT_SECRET_SEED) {
		throw new Error('No hay semilla de JWT - Revisar varibles de entorno');
	}
	return new Promise(resolve => {
		jwt.verify(token, process.env.JWT_SECRET_SEED, (err, decode) => {
			if (err) {
				resolve([false, err]);
			}
			resolve([true, decode as IJWTUser]);
		});
	});
};

export const deleteFile = async (filePath: string) => {
	const parentDirectory = path.join(process.cwd(), 'files', filePath);
	fs.unlinkSync(parentDirectory);
};

export const uploadImage = async (
	image: formidable.File,
	filePath: string,
	fileName: string,
): Promise<[true, string] | [false]> => {
	const pattern = /image-*/;
	const buffer = await readChunk(image.filepath, { length: image.size });
	const fileInfo = await imageType(buffer);
	if (!fileInfo?.mime.match(pattern)) {
		return [false];
	}

	const resPath = path.join(filePath, `${fileName}.${fileInfo.ext}`);
	const finalPath = path.join(process.cwd(), 'files', resPath);
	await saveFormidableFile(image, filePath, finalPath);
	return [true, resPath];
};
