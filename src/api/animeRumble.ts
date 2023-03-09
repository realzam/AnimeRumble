import axios from 'axios';

const animeRumbleApi = axios.create({
	baseURL: '/api',
});

export default animeRumbleApi;
