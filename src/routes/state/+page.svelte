<!-- App.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { todoStore } from './todoStore.svelte';
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/components/ui/input/input.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';

	let newTodoTitle: string = $state('');

	function addNewTodo() {
		if (newTodoTitle.trim() !== '') {
			todoStore.addTodo(newTodoTitle.trim());
			newTodoTitle = '';
		}
	}

	let todos = [];

	$effect(() => {
		todos = todoStore.todos;
	});

	onMount(async () => {
		await todoStore.loadTodos();
	});
</script>

<div class="mx-auto max-w-md rounded-lg p-6 shadow-md">
	<div class="mb-4 flex">
		<Input
			bind:value={newTodoTitle}
			placeholder="Nouvelle tache"
			onkeydown={(e) => e.key === 'Enter' && addNewTodo()}
		/>

		<Button onclick={addNewTodo} class="rounded-r">Ajouter</Button>
	</div>

	{#if todoStore.loading}
		<p class="text-gray-500">Chargement des tâches...</p>
	{:else if todoStore.error}
		<p class="text-red-500">Erreur : {todoStore.error}</p>
	{:else}
		<ul>
			{#each todoStore.todos as todo}
				<li class="flex items-center justify-between border-b py-2">
					<div class="flex items-center">
						<Checkbox
							onchange={() => todoStore.toggleTodo(todo.id)}
							checked={todo.completed}
							class="mr-2"
						/>
						<span class={todo.completed ? 'text-gray-500 line-through' : ''}>
							{todo.title}
						</span>
					</div>
					<Button onclick={() => todoStore.deleteTodo(todo.id)} variant="destructive">
						Supprimer
					</Button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
