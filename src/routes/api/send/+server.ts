import { json } from '@sveltejs/kit';
import { client } from '$lib/server/discord';
import { TextChannel } from 'discord.js';

export const POST = async ({ request }) => {
	const { channelId, message } = await request.json();

	if (!client?.isReady()) {
		return json([]);
	}

	const channel = (await client.channels.fetch(channelId)) as TextChannel;

	await channel.send(message);

	return json({ ok: true });
};
