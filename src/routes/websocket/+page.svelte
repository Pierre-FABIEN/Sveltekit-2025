<script lang="ts">
	import { Button } from '$lib/components/shadcn/ui/button';
	import { Input } from '$lib/components/shadcn/ui/input';
	import { Label } from '$lib/components/shadcn/ui/label';
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
				<Label for="message" class="block font-medium">Send a message to WebSocket clients:</Label>
				<Input id="message" name="message" type="text" bind:value={message} />
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

<div class="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md mb-10">
	<h1 class="text-2xl font-bold text-gray-800 mb-4">Memo : Gestion de WebSocket</h1>

	<section class="mb-6">
		<h2 class="text-xl font-semibold text-gray-700 mb-2">
			1. Rôle de <code>createWSSGlobalInstance</code>
		</h2>
		<ul class="list-disc pl-6 space-y-2 text-gray-600">
			<li>
				Elle crée une instance globale de <code>WebSocketServer</code>, qui est stockée dans une
				variable globale (dans
				<code>globalThis</code>).
			</li>
			<li>
				Cette instance globale est préparée avec le comportement adéquat pour gérer chaque nouveau
				client :
				<ul class="list-circle pl-6 space-y-2">
					<li>
						À chaque connexion (<code>wss.on('connection')</code>), elle génère un
						<code>socketId</code>, logue la connexion, et peut gérer d’autres événements comme
						<code>message</code> ou <code>close</code>.
					</li>
				</ul>
			</li>
		</ul>
	</section>

	<section class="mb-6">
		<h2 class="text-xl font-semibold text-gray-700 mb-2">2. Rôle du hook</h2>
		<ul class="list-disc pl-6 space-y-2 text-gray-600">
			<li>
				Le hook utilise l’instance globale créée par <code>createWSSGlobalInstance</code>.
			</li>
			<li>
				Son but est de s’assurer que cette instance WebSocket est disponible pour l’application (en
				la mettant dans
				<code>event.locals.wss</code>).
			</li>
			<li>Il ne recrée pas le serveur WebSocket ni ne définit son comportement.</li>
		</ul>
	</section>

	<section class="mb-6">
		<h2 class="text-xl font-semibold text-gray-700 mb-2">Résumé clair</h2>
		<div class="space-y-4">
			<div>
				<h3 class="text-lg font-medium text-gray-700">createWSSGlobalInstance :</h3>
				<ul class="list-disc pl-6 space-y-2 text-gray-600">
					<li>
						Configure le serveur global WebSocket et définit comment gérer chaque nouveau client.
					</li>
					<li>
						Met cette instance en global pour qu’elle soit réutilisable partout dans l’application.
					</li>
				</ul>
			</div>

			<div>
				<h3 class="text-lg font-medium text-gray-700">Le hook :</h3>
				<ul class="list-disc pl-6 space-y-2 text-gray-600">
					<li>Utilise cette instance globale.</li>
					<li>
						Assure qu’elle est prête à être utilisée dans les différentes requêtes HTTP ou SSR.
					</li>
				</ul>
			</div>

			<p class="text-gray-600">
				En gros, <code>createWSSGlobalInstance</code> pose les fondations pour le serveur WebSocket,
				et le hook permet à l’app de travailler avec ces fondations sans tout recréer. 👌
			</p>
		</div>
	</section>
</div>
