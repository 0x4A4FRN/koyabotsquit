<script lang="ts">
	import { onMount } from 'svelte';

	let guilds: any[] = $state([]);
	let channels: any[] = $state([]);

	let selectedGuild = $state('');
	let selectedChannel = $state('');
	let message = $state('');

	// Load servers
	async function loadGuilds() {
		const res = await fetch('/api/guilds');
		guilds = await res.json();
	}

	// Load channels when server changes
	async function loadChannels() {
		const res = await fetch(`/api/channels?guildId=${selectedGuild}`);
		channels = await res.json();
	}

	// Send message
	async function sendMessage() {
		await fetch('/api/send', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				channelId: selectedChannel,
				message
			})
		});

		message = '';
	}

	onMount(() => loadGuilds());
</script>

<h2>KoyaBotsquit Dashboard</h2>

<!-- Server Dropdown -->
<select bind:value={selectedGuild} onchange={loadChannels}>
	<option value="">Select Server</option>
	{#each guilds as g}
		<option value={g.id}>{g.name}</option>
	{/each}
</select>

<br /><br />

<!-- Channel Dropdown -->
<select bind:value={selectedChannel}>
	<option value="">Select Channel</option>
	{#each channels as c}
		<option value={c.id}>#{c.name}</option>
	{/each}
</select>

<br /><br />

<!-- Message Box -->
<textarea bind:value={message} placeholder="Type message..."></textarea>

<br />

<!-- Send Button -->
<button onclick={sendMessage}> Send </button>
