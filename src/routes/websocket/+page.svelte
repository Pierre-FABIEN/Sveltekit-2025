<script lang="ts">
	import { Button } from '$lib/components/shadcn/ui/button';
	import { toast } from 'svelte-sonner';

	let webSocketEstablished = $state(false);
	let ws: WebSocket | null = null;
	let log = $state<string[]>([]);
	let message = $state('');
	let error = $state<string | null>(null);

	// Log events for display
	const logEvent = (str: string) => {
		log = [...log, str];
	};

	$effect(() => {
		if (webSocketEstablished) return;

		const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
		ws = new WebSocket(`${protocol}//${window.location.host}/WebsocketSignal`);

		ws.addEventListener('open', () => {
			webSocketEstablished = true;
			logEvent('[websocket] connection open');
		});

		ws.addEventListener('close', () => {
			logEvent('[websocket] connection closed');
			webSocketEstablished = false;
		});

		ws.addEventListener('message', (event) => {
			logEvent(`[websocket] message received: ${event.data}`);
		});
	});

	// Handle form submission with vanilla preventDefault
	const handleSubmit = async (event: Event, action: string) => {
		event.preventDefault();
		error = null;

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		try {
			const response = await fetch(action, {
				method: 'POST',
				body: formData
			});
			const result = await response.json();

			if (result.type !== 'success') {
				throw new Error(result.message || 'An error occurred');
			}

			toast.success('Message envoyé');
		} catch (err) {
			error = (err as Error).message;
		}
	};
</script>

<div class="mx-auto my-10 px-4 sm:px-6 lg:px-8 space-y-6">
	<h1 class="text-2xl font-bold">
		SvelteKit with WebSocket Integration without database and protections
	</h1>
	<div class="flex">
		<div class="col-6 border m-2 p-2 rounded justify-center">
			{#if error}
				<p class="text-red-500">{error}</p>
			{/if}
			<form class="space-y-4" onsubmit={(event) => handleSubmit(event, '?/sendMessage')}>
				<label for="message" class="block font-medium">
					Send a message to WebSocket clients:
				</label>
				<input
					id="message"
					name="message"
					type="text"
					class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
					bind:value={message}
				/>
				<Button type="submit" class="w-full my-2">Send Message</Button>
			</form>

			<form class="space-y-4" onsubmit={(event) => handleSubmit(event, '?/getData')}>
				<Button type="submit" class="w-full my-2">Request Data from Server</Button>
			</form>
		</div>

		<div class="col-6 border m-2 p-2 rounded">
			<ul class="mt-6 space-y-2">
				{#each log as event}
					<li class="p-2 rounded-md">{event}</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
