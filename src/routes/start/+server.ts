import { text } from '@sveltejs/kit';
import { start } from '$lib/server/discord';

let started = false;

export const GET = async () => {
	if (!started) {
		started = true;
		start();
		console.log('Bot started via /start');
	}

	return text('bot started');
};
