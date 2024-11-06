<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';

	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { createDirectorSchema } from '$lib/schema/directorsSchema';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let { data } = $props();

	const createDirectorForm = superForm(data.form, {
		validators: zodClient(createDirectorSchema),
		id: 'createDirectorForm'
	});

	const {
		form: createDirectorData,
		enhance: createDirectorEnhance,
		message: createDirectorMessage
	} = createDirectorForm;

	$effect(() => {
		if ($createDirectorMessage === 'Director created successfully') {
			toast.success($createDirectorMessage);
			setTimeout(() => goto('/directors'), 0);
		}
	});
</script>

<div class="mx-auto mt-8 max-w-lg">
	<h1 class="mb-4 text-2xl font-bold">Create a New Director</h1>

	<form method="POST" action="?/create" use:createDirectorEnhance>
		<div class="mb-4">
			<Form.Field name="name" form={createDirectorForm}>
				<Form.Control let:attrs>
					<Form.Label>Name</Form.Label>
					<Input {...attrs} type="text" bind:value={$createDirectorData.name} required />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<div class="mb-4">
			<Form.Field name="email" form={createDirectorForm}>
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input {...attrs} type="email" bind:value={$createDirectorData.email} required />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<div class="mb-4">
			<Form.Field name="age" form={createDirectorForm}>
				<Form.Control let:attrs>
					<Form.Label>Age</Form.Label>
					<Input {...attrs} type="number" bind:value={$createDirectorData.age} required />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<div class="mb-4">
			<Form.Field name="isActive" form={createDirectorForm}>
				<Form.Control let:attrs>
					<Form.Label>Active</Form.Label>
					<Checkbox {...attrs} bind:checked={$createDirectorData.isActive} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<div class="mt-6">
			<Button type="submit">Create Director</Button>
		</div>
	</form>
</div>
