<script lang="ts">
	import { SocioClient } from 'socio/dist/core-client.js';

	let { data } = $props();
	let localParticipants = $state(data.participants);

	const sc = new SocioClient(`ws://${location.hostname}:3000`);

	$effect(() => {
		console.log('Participants initiaux côté client :', localParticipants);

		(async () => {
			await sc.ready();
			await sc.SubscribeProp('participants', (updatedParticipants) => {
				console.log('Mise à jour des participants reçue :', updatedParticipants);
				localParticipants = updatedParticipants;
			});
		})();

		return () => {
			sc.UnsubscribeProp('participants');
		};
	});
</script>

<main>
	<section>
		<form method="post" action="?/insertParticipant">
			<input type="text" name="name" placeholder="Name" required />
			<input type="number" name="num" min="0" placeholder="Number" required />
			<button type="submit">Add Participant</button>
		</form>
	</section>

	<section>
		{#each localParticipants as participant}
			<div class="participant">
				<h4>{participant.name}</h4>
				<h4>{participant.num}</h4>
			</div>
		{/each}
	</section>
</main>

<style>
	/* Styles simplifiés */
</style>
