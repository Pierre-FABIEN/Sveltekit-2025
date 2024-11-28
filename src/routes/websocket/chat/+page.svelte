<script lang="ts">
	import * as Form from '$shadcn/form';
	import { Input } from '$shadcn/input';
	import { Button } from '$shadcn/button';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { chatSchema } from '$lib/schema/chat/chatSchema';
	import { toast } from 'svelte-sonner';
	import { ScrollArea } from 'bits-ui';
	import { SendHorizontal } from 'lucide-svelte';

	let { data } = $props();

	let webSocketEstablished = $state(false);
	let ws: WebSocket | null = null;
	let messages = $state(data.messages || []);
	let userSocketId = $state(''); // Stocke l'identifiant WebSocket de l'utilisateur

	// Initialisation du formulaire avec SuperForm
	const chatForm = superForm(data.form, {
		validators: zodClient(chatSchema),
		id: 'chatForm'
	});
	const { form: chatData, enhance: chatEnhance, message: chatMessage } = chatForm;

	$effect(() => {
		if (webSocketEstablished) return;

		const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
		ws = new WebSocket(`${protocol}//${window.location.host}/WebsocketSignal`);

		ws.addEventListener('open', () => {
			webSocketEstablished = true;
			console.log('[websocket] connection open');
		});

		ws.addEventListener('close', () => {
			webSocketEstablished = false;
			console.log('[websocket] connection closed');
		});

		// Réception des messages WebSocket
		ws.addEventListener('message', (event) => {
			try {
				const newMessage = JSON.parse(event.data);

				// Si le message est un socketId, l'associer à l'utilisateur
				if (newMessage.type === 'socketId') {
					userSocketId = newMessage.socketId;
					return;
				}

				// Ajouter les messages valides
				messages = [...messages, newMessage];
			} catch (error) {
				console.error('Invalid WebSocket message:', event.data);
			}

			// Scroller vers le bas après ajout d'un message
			setTimeout(() => {
				scrollToBottom();
			}, 100);
		});
	});

	function scrollToBottom() {
		const scrollable = document.querySelector('[data-viewport]');
		if (scrollable) {
			scrollable.scrollTo({
				top: scrollable.scrollHeight,
				behavior: 'smooth'
			});
		} else {
			console.error('Scrollable element not found');
		}
	}
</script>

<div class="mx-auto mt-8 max-w-lg">
	<h1 class="text-4xl font-semibold text-[#fe3d00]">Chat Room</h1>

	<!-- Formulaire pour envoyer des messages -->
	<form
		class="flex justify-center items-center gap-2 mt-4"
		method="POST"
		action="?/sendMessage"
		use:chatEnhance
	>
		<Form.Field name="message" class="w-[100%]" form={chatForm}>
			<Form.Control>
				<Input
					type="text"
					name="message"
					bind:value={$chatData.message}
					placeholder="Type your message here..."
					required
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Button type="submit" class="mt-[0px]">
			<SendHorizontal />
		</Button>
	</form>

	<!-- Zone d'affichage des messages -->
	<ScrollArea.Root
		class="relative overflow-hidden rounded-md border border-gray-300 bg-gray-50 p-4 shadow-md mt-6"
	>
		<ScrollArea.Viewport class="h-[50vh] w-full" data-viewport>
			<ul class="space-y-4">
				{#each messages as message}
					<li
						class={`flex gap-4 p-4 rounded-lg shadow transition ${
							message.client_id === userSocketId ? 'flex-row-reverse' : ''
						} bg-[${message.color}]`}
						style={`background-color: ${message.color};`}
					>
						<img
							src={message.avatar}
							alt="User Avatar"
							class="w-12 h-12 rounded-full border border-gray-300 shadow-sm"
						/>
						<div class="flex-1">
							<div class="flex items-center justify-between">
								<h3 class="text-sm font-semibold">{message.client_id}</h3>
								<small class="text-xs text-white">
									{new Date(message.createdAt).toLocaleString()}
								</small>
							</div>
							<p class="mt-2 text-sm">{message.message}</p>
						</div>
					</li>
				{/each}
			</ul>
		</ScrollArea.Viewport>
		<ScrollArea.Scrollbar orientation="vertical">
			<ScrollArea.Thumb class="rounded-md" />
		</ScrollArea.Scrollbar>
	</ScrollArea.Root>
</div>
