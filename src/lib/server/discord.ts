import { Client, GatewayIntentBits } from 'discord.js';
import { DISCORD_TOKEN } from '$env/static/private';

export let client: Client | null = null;

const PREFIX = 'sudo';

export function start() {
	if (client) return;

	client = new Client({
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.MessageContent
		]
	});

	client.once('ready', () => {
		console.log('Bot ready:', client?.user?.tag);
	});

	client.on('messageCreate', async (message) => {
		if (message.author.bot) return;
		console.log(message.content);

		const botId = client!.user!.id;
		const isMentioned = message.mentions.users.has(botId);

		if (isMentioned) {
			const content = message.content
				.replace(new RegExp(`<@!?${botId}>`, 'g'), '')
				.trim()
				.toLowerCase();

			if (content === 'prefix') {
				return message.reply(`My prefix is \`${PREFIX}\`\nTry: \`${PREFIX} test\``);
			}

			if (content.includes('preem')) {
				return message.reply('DOMINATING THE SERVER. ty');
			}
		}

		if (!message.content.startsWith(PREFIX)) return;

		const args = message.content.slice(PREFIX.length).trim().split(/\s+/);

		const command = args.shift()?.toLowerCase();

		if (command === 'test') {
			await message.reply(
				'TARA TARA TARA TARA! TARA TARA! PUSH! PUSH! SIGE MAGCOCOMMAND LANG AKO.'
			);
		}
		if (command === 'help') {
			await message.reply("Btch I can't help you");
		}

		if (command.includes('preem')) {
			await message.reply('DOMINATING THE SERVER. ty');
		}
	});

	client.login(DISCORD_TOKEN);
}
