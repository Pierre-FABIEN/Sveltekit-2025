<script lang="ts">
	import { SocioClient } from 'socio/dist/core-client.js';
	import { writable, type Writable } from 'svelte/store';
	import { toast } from 'svelte-sonner';

	let sc: SocioClient;
	let participants: Writable<any[]> = writable([]);
	let newParticipant = $state({ name: '', num: 0 });
	let ready = $state(false);

	// Connexion au Socio Server
	$effect(() => {
		sc = new SocioClient(`ws://${location.hostname}:3000`, {
			logging: { verbose: true },
			name: 'Main'
		});

		console.log(sc);

		sc.ready()
			.then(() => {
				ready = true;
				toast.success('Connected to Socio Server!');

				// Abonnement à la table Participant
				const id = sc.Subscribe({ sql: `SELECT * FROM Participant;` }, (res) => {
					if (Array.isArray(res)) {
						participants.set(res);
					} else {
						console.error('Expected an array of participants, but got:', res);
					}
				});

				// Cleanup on destroy
				return () => {
					sc.Unsubscribe(id);
				};
			})
			.catch((error) => {
				console.error('Failed to connect to Socio Server:', error);
				toast.error('Failed to connect to Socio Server.');
			});
	});

	async function addParticipant() {
		if (!newParticipant.name || newParticipant.num <= 0) {
			toast.error('Name and number must be valid!');
			return;
		}

		try {
			await sc.Query(`INSERT INTO Participant (name, num) VALUES (:name, :num);`, {
				name: newParticipant.name,
				num: newParticipant.num
			});
			toast.success('Participant added successfully!');
			newParticipant = { name: '', num: 0 };
		} catch (error) {
			console.error('Failed to add participant:', error);
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
						<strong>{participant.id} - {participant.name}</strong>: {participant.num}
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
