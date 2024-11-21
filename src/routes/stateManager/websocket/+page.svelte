<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { participantSchema } from '$lib/schema/participantsSchema';
	import { SocioClient } from 'socio/dist/core-client.js';
	import * as Form from '$shadcn/form';
	import { Input } from '$shadcn/input';
	import { Button } from '$shadcn/button';
	import { toast } from 'svelte-sonner';

	let { data } = $props();
	let localParticipants = $state(data.participants);

	const participantForm = superForm(data.form, {
		validators: zodClient(participantSchema),
		id: 'participantForm'
	});

	const {
		form: participantData,
		enhance: participantEnhance,
		message: participantMessage
	} = participantForm;

	const sc = new SocioClient(`ws://${location.hostname}:3000`);

	$effect(() => {
		if ($participantMessage) {
			toast.success($participantMessage);
		}
	});

	$effect(() => {
		(async () => {
			await sc.ready();
			await sc.SubscribeProp('participants', (updatedParticipants) => {
				console.log('Mise à jour des participants reçue via WebSocket :', updatedParticipants);
				localParticipants = updatedParticipants;
			});
		})();

		return () => {
			sc.UnsubscribeProp('participants');
		};
	});
</script>

<main class="max-w-lg mx-auto mt-8">
	<h1 class="mb-4 text-2xl font-bold">Ajouter un participant</h1>

	<form method="POST" action="?/insertParticipant" use:participantEnhance>
		<div class="mb-4">
			<Form.Field name="name" form={participantForm}>
				<Form.Control>
					<Form.Label>Nom</Form.Label>
					<Input name="name" type="text" bind:value={$participantData.name} required />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<div class="mb-4">
			<Form.Field name="num" form={participantForm}>
				<Form.Control>
					<Form.Label>Numéro</Form.Label>
					<Input name="num" type="number" bind:value={$participantData.num} required />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<div class="mt-6">
			<Button type="submit">Ajouter</Button>
		</div>
	</form>

	<section class="mt-8">
		<h2 class="mb-4 text-xl font-bold">Liste des participants</h2>
		<div class="space-y-4">
			{#each localParticipants as participant}
				<div class="participant border rounded p-4 shadow">
					<h4 class="font-bold">{participant.name}</h4>
					<p>{participant.num}</p>
				</div>
			{/each}
		</div>
	</section>
</main>
