import { json } from '@sveltejs/kit';
import { client } from '$lib/server/discord';

export const GET = async ({ url }) => {
	const guildId = url.searchParams.get('guildId');

	if (!client?.isReady()) {
		return json([]);
	}

	const guild = await client.guilds.fetch(guildId!);
	const channels = guild.channels.cache
		.filter((c) => c.isTextBased())
		.map((c) => ({
			id: c.id,
			name: c.name
		}));

	return json(channels);
};
