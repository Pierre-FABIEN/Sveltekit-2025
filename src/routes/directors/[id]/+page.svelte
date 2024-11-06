<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { updateDirectorSchema } from '$lib/schema/directorsSchema';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let { data } = $props();

	const updateDirectorForm = superForm(data.updateDirector, {
		validators: zodClient(updateDirectorSchema),
		id: 'updateDirectorForm'
	});

	const {
		form: updateDirectorData,
		enhance: updateDirectorEnhance,
		message: updateDirectorMessage
	} = updateDirectorForm;

	$effect(() => {
		if ($updateDirectorMessage === 'Director updated successfully') {
			toast.success($updateDirectorMessage);
			setTimeout(() => goto('/directors'), 0);
		}
	});
</script>

<div class="mx-auto mt-8 max-w-lg">
	<h1 class="mb-4 text-2xl font-bold">Update Director</h1>

	<form method="POST" action="?/update" use:updateDirectorEnhance>
		<div class="mb-4">
			<Form.Field name="name" form={updateDirectorForm}>
				<Form.Control let:attrs>
					<Form.Label>Name</Form.Label>
					<Input {...attrs} type="text" bind:value={$updateDirectorData.name} required />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<div class="mb-4">
			<Form.Field name="email" form={updateDirectorForm}>
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input {...attrs} type="email" bind:value={$updateDirectorData.email} required />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<div class="mb-4">
			<Form.Field name="age" form={updateDirectorForm}>
				<Form.Control let:attrs>
					<Form.Label>Age</Form.Label>
					<Input {...attrs} type="number" bind:value={$updateDirectorData.age} required />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<div class="mb-4">
			<Form.Field name="isActive" form={updateDirectorForm}>
				<Form.Control let:attrs>
					<Form.Label>Active</Form.Label>
					<Checkbox {...attrs} bind:checked={$updateDirectorData.isActive} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<input hidden name="id" value={data.updateDirector.data.id} />
		<input hidden name="createdAt" value={data.updateDirector.data.createdAt} />
		<input hidden name="isActive" value={$updateDirectorData.isActive} />

		<div class="mt-6">
			<Button type="submit">Update Director</Button>
		</div>
	</form>
</div>
