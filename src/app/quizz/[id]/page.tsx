import { serverClient } from '@/trpc/client/serverClient';

async function getData(id: string) {
	const res = await serverClient.quizz.quizz({ id });
	console.log('getData', res);

	return res;
}

export default async function Page({ params }: { params: { id: string } }) {
	console.log('params', params);

	const data = await getData(params.id);
	console.log(data);

	return <>hola</>;
}
