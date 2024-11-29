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
	import { generateAvatar, generateColor } from './fonctions.js';

	let { data } = $props();

	let webSocketEstablished = $state(false);
	let ws: WebSocket | null = null;
	let messages = $state(data.messages || []);
	let userSocketId = $state('');

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
				const data = JSON.parse(event.data);
				console.log('[websocket] message received:', data);

				// Gestion selon le type de message
				switch (data.type) {
					case 'socketId':
						userSocketId = data.value;
						break;

					case 'Chat':
						const messageData = data.value;

						// Ajouter à la liste des messages
						messages = [...messages, messageData];
						break;

					default:
						console.warn('[websocket] Type de message inconnu:', data.type);
				}
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
		<input type="text" name="client_id" value={userSocketId} hidden />
		<input type="text" name="avatar" value={generateAvatar(userSocketId)} hidden />
		<input type="text" name="color" value={generateColor(userSocketId)} hidden />
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
		<ScrollArea.Scrollbar
			orientation="vertical"
			class="flex w-2.5 touch-none select-none rounded-full border-l border-l-transparent bg-muted p-px transition-all duration-200 hover:w-3 hover:bg-dark-10 data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out-0 data-[state=visible]:fade-in-0"
		>
			<ScrollArea.Thumb class="flex-1 rounded-full bg-muted-foreground" />
		</ScrollArea.Scrollbar>
		<ScrollArea.Corner />
	</ScrollArea.Root>
</div>

<div class="bg-gray-100 p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
	<h2 class="text-2xl font-bold text-gray-800 mb-4">
		💡 Mémo : Gestion des données dynamiques avec WebSocket
	</h2>
	<div class="space-y-4 text-gray-700">
		<p>
			Lors de la gestion des données dynamiques avec WebSocket, il est essentiel que toutes les
			données dynamiques liées aux interactions des clients soient générées et transmises
			directement depuis le <strong>front</strong> pour éviter les erreurs ou modifications
			involontaires par le <strong>back</strong>.
		</p>

		<h3 class="text-xl font-semibold text-gray-800">📌 Données à gérer côté front :</h3>
		<ul class="list-disc ml-5 space-y-2">
			<li>
				<strong>Couleur unique :</strong> Générée côté front pour chaque client à l'aide d'un
				identifiant unique (par exemple, <code>socketId</code>). Cela garantit une uniformité dans
				l'affichage.
			</li>
			<li>
				<strong>Avatar :</strong> Créé côté front en utilisant un générateur d'avatar (ex :
				<code>robohash</code>). Chaque client doit transmettre son avatar pour qu'il ne soit pas
				modifié par le back.
			</li>
			<li>
				<strong>Socket ID :</strong> Obtenu via WebSocket lors de la connexion initiale. Ce
				<code>socketId</code>
				doit être inclus dans chaque requête envoyée au back pour l'identification unique de l'utilisateur.
			</li>
		</ul>

		<h3 class="text-xl font-semibold text-gray-800">🔗 Flux de données recommandé :</h3>
		<ol class="list-decimal ml-5 space-y-2">
			<li>
				Le client génère dynamiquement <strong>la couleur</strong>, <strong>l'avatar</strong>, et
				récupère le <code>socketId</code> après la connexion WebSocket.
			</li>
			<li>
				Ces données sont transmises dans le formulaire (<code>form.data</code>) envoyé au serveur
				via une action.
			</li>
			<li>
				Le serveur vérifie uniquement la validité de ces données (ex : format ou présence du <code
					>socketId</code
				>) et les diffuse sans les modifier aux autres clients connectés.
			</li>
		</ol>

		<h3 class="text-xl font-semibold text-gray-800">⚠️ Points à retenir :</h3>
		<ul class="list-disc ml-5 space-y-2">
			<li>
				<strong>Ne générez pas de données dynamiques côté serveur</strong> pour chaque client. Cela peut
				provoquer des incohérences entre les données reçues et envoyées.
			</li>
			<li>
				Le serveur joue un rôle de vérification et de diffusion des données, mais il ne doit pas
				modifier les données transmises par le client.
			</li>
			<li>
				Les données dynamiques, comme la couleur ou l'avatar, doivent être consistantes et ne pas
				changer lors des cycles d'envoi/réception.
			</li>
		</ul>
	</div>
</div>
