<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { SocioClient } from 'socio/dist/core-client.js';
	import { writable } from 'svelte/store';
	import { toast } from 'svelte-sonner';

	const sc = new SocioClient(`ws://${location.hostname}:3000`, {
		logging: { verbose: true },
		name: 'Main'
	});

	let participants = writable([]);
	let newParticipant = $state({ name: '', num: 0 });
	let ready = $state(false);

	$effect(() => {
		async () => {
			ready = await sc.ready();
			toast.success('Connected to Socio Server!');

			// Subscribe to participants
			const id = sc.Subscribe({ sql: `SELECT * FROM Participants;` }, (res) =>
				participants.set(res)
			);

			// Cleanup on destroy
			return () => {
				sc.Unsubscribe(id);
			};
		};
	});

	async function addParticipant() {
		if (!newParticipant.name || newParticipant.num <= 0) {
			toast.error('Name and number must be valid!');
			return;
		}

		try {
			await sc.Query(`INSERT INTO Participants (name, num) VALUES (:name, :num);`, {
				name: newParticipant.name,
				num: newParticipant.num
			});
			toast.success('Participant added successfully!');
			newParticipant = { name: '', num: 0 };
		} catch (error) {
			toast.error('Failed to add participant!');
		}
	}
</script>

<main>
	{#if ready}
		<section>
			<h2>Participants</h2>
			<ul>
				{#each $participants as participant (participant.id)}
					<li>
						<strong>{participant.name}</strong>: {participant.num}
					</li>
				{/each}
			</ul>
		</section>

		<section>
			<h3>Add a Participant</h3>
			<input type="text" placeholder="Name" bind:value={newParticipant.name} />
			<input type="number" placeholder="Number" bind:value={newParticipant.num} min="1" />
			<button onclick={addParticipant}>Add</button>
		</section>
	{:else}
		<p>Connecting to the server...</p>
	{/if}
</main>

<style>
	main {
		padding: 1rem;
		font-family: Arial, sans-serif;
	}

	section {
		margin-bottom: 2rem;
	}

	input {
		display: block;
		margin: 0.5rem 0;
		padding: 0.5rem;
		font-size: 1rem;
		width: 100%;
	}

	button {
		padding: 0.5rem 1rem;
		font-size: 1rem;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #0056b3;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		margin-bottom: 0.5rem;
	}
</style>
