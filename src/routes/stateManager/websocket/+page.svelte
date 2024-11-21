<script lang="ts">
	import { onMount } from 'svelte';
	import { SocioClient } from 'socio/dist/core-client.js';
	import { slide } from 'svelte/transition';

	let { data } = $props();

	let participants = [...data.participants];
	const sc = new SocioClient(`ws://${location.hostname}:3000`);

	// Écoute des mises à jour via WebSocket
	$effect(() => {
		sc.Subscribe(
			{ channel: 'participants' },
			(res: { event: string; data: { id: number; name: string; num: number } }) => {
				if (res.event === 'new_user') {
					participants = [...participants, res.data];
				}
			}
		);

		return () => {
			sc.UnsubscribeAll({ queries: true });
		};
	});
</script>

<main>
	<!-- Formulaire pour insérer un utilisateur -->
	<section class="vert" style="width: 600px;">
		<form method="post" action="?/insertUser">
			<div class="inputs">
				<input type="text" name="name" placeholder="Name" required />
				<input type="number" name="num" min="0" placeholder="Number" required />
			</div>
			<button type="submit"> INSERT INTO Participants (name, num) </button>
		</form>
	</section>

	<!-- Liste des participants -->
	<section class="vert Participants">
		{#each participants as p (p.id)}
			<div class="user" transition:slide>
				<h4>{p.id}</h4>
				<h4>|</h4>
				<h4>{p.name}</h4>
				<h4>|</h4>
				<h4>{p.num}</h4>
			</div>
		{/each}
	</section>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
	}

	section.vert {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.inputs {
		display: flex;
		gap: 8px;
	}

	input {
		padding: 8px;
		font-size: 16px;
	}

	.Participants {
		max-width: 600px;
		width: 100%;
		overflow-y: auto;
		max-height: 300px;
		padding: 8px;
		border: 1px solid #ccc;
	}

	.user {
		display: flex;
		justify-content: space-between;
		padding: 8px;
		border-bottom: 1px solid #eee;
	}

	button {
		padding: 8px 16px;
		font-size: 16px;
		cursor: pointer;
	}
</style>
