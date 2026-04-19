import { json } from '@sveltejs/kit';
import { client } from '$lib/server/discord';

export const GET = async () => {
	if (!client?.isReady()) {
		return json([]);
	}
	const guilds = client.guilds.cache.map((g) => ({
		id: g.id,
		name: g.name
	}));

	return json(guilds);
};
