import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
	imageUploader: f({ image: { maxFileSize: '4MB' } }).onUploadComplete(
		async ({ metadata: _, file }) => {
			return file;
		},
	),
	videoUploader: f({ video: { maxFileSize: '256MB' } }).onUploadComplete(
		async ({ metadata: _, file }) => {
			return file;
		},
	),
	audioUploader: f({ audio: { maxFileSize: '64MB' } }).onUploadComplete(
		async ({ metadata: _, file }) => {
			return file;
		},
	),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
