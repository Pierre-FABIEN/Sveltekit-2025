<script lang="ts">
	import { io } from 'socket.io-client';

	import Button from '$lib/components/shadcn/ui/button/button.svelte';
	import Input from '$lib/components/shadcn/ui/input/input.svelte';
	import Avatar from '$lib/components/shadcn/ui/avatar/avatar.svelte';
	import AvatarImage from '$lib/components/shadcn/ui/avatar/avatar-image.svelte';
	import AvatarFallback from '$lib/components/shadcn/ui/avatar/avatar-fallback.svelte';
	import Card from '$lib/components/shadcn/ui/card/card.svelte';
	import CardHeader from '$lib/components/shadcn/ui/card/card-header.svelte';
	import CardContent from '$lib/components/shadcn/ui/card/card-content.svelte';
	import CardFooter from '$lib/components/shadcn/ui/card/card-footer.svelte';
	import ScrollArea from '$lib/components/shadcn/ui/scroll-area/scroll-area.svelte';
	import PUBLIC_HOSTNAME from '$env/static/public';

	let { data } = $props();

	let chats = $state(data.chats || []);
	let message = $state('');
	let avatar = $state('https://via.placeholder.com/50'); // Default avatar URL
	let color = $state('#000000'); // Default chat color

	// Socket.io instance (initialized only once)
	let socket: any;
	const client_id = crypto.randomUUID();

	$effect(() => {
		socket = io(PUBLIC_HOSTNAME); // Initialize connection with the server

		socket.on('connect', () => {
			console.log('Connected to Socket.io server');
		});

		socket.on('newChat', (chat) => {
			chats = [...chats, chat];
		});
	});

	/**
	 * Generates a random avatar URL using the RoboHash service.
	 */
	function generateAvatar(): string {
		return `https://robohash.org/${client_id}?size=50x50`;
	}

	/**
	 * Generates a random hex color.
	 */
	function generateColor(): string {
		// Hash the client_id into a numeric value
		let hash = 0;
		for (let i = 0; i < client_id.length; i++) {
			hash = client_id.charCodeAt(i) + ((hash << 5) - hash);
		}

		// Convert the hash to a hex color
		const color = `#${((hash >> 0) & 0xffffff).toString(16).padStart(6, '0')}`;
		return color;
	}

	/**
	 * Formate une date au format 'DD/MM/YYYY HH:mm'.
	 */
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const options: Intl.DateTimeFormatOptions = {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		};
		return date.toLocaleDateString('fr-FR', options);
	}

	function sendChat() {
		if (message.trim() !== '') {
			color = generateColor();
			avatar = generateAvatar();
			const data = { client_id, color, message, avatar };

			socket.emit('chat', data);
			message = ''; // Reset message after sending
		}
	}
</script>

<div class="flex flex-col items-center p-6 min-h-screen">
	<Card class="w-full max-w-2xl shadow-lg flex flex-col">
		<CardHeader class="text-white rounded-t-md">
			<h1 class="text-2xl font-bold text-center">💬 Chat des Chats</h1>
		</CardHeader>
		<CardContent class="p-0 flex-1">
			<ScrollArea id="chat-content" class="p-4 space-y-4 overflow-y-auto h-96">
				{#each chats as chat (chat.id)}
					{#if chat.client_id === client_id}
						<!-- Message envoyé -->
						<div class="flex items-start space-x-4 animate-fade-in justify-end">
							<div class="flex flex-col items-end">
								<div class="flex items-center space-x-2">
									<span class="font-semibold text-blue-500">
										{chat.client_id}
									</span>
									<span class="text-gray-400 text-sm">
										{formatDate(chat.createdAt)}
									</span>
								</div>
								<p class="bg-blue-100 text-blue-800 p-2 rounded-md">
									{chat.message}
								</p>
							</div>
							<Avatar class="flex-shrink-0">
								<AvatarImage src={chat.avatar} alt="Avatar" />
								<AvatarFallback>{chat.client_id.charAt(0)}</AvatarFallback>
							</Avatar>
						</div>
					{:else}
						<!-- Message reçu -->
						<div class="flex items-start space-x-4 animate-fade-in">
							<Avatar class="flex-shrink-0">
								<AvatarImage src={chat.avatar} alt="Avatar" />
								<AvatarFallback>{chat.client_id.charAt(0)}</AvatarFallback>
							</Avatar>
							<div class="flex flex-col">
								<div class="flex items-center space-x-2">
									<span class="font-semibold text-gray-500">
										{chat.client_id}
									</span>
									<span class="text-gray-400 text-sm">
										{formatDate(chat.createdAt)}
									</span>
								</div>
								<p class="bg-gray-100 text-gray-800 p-2 rounded-md">
									{chat.message}
								</p>
							</div>
						</div>
					{/if}
				{/each}
			</ScrollArea>
		</CardContent>
		<CardFooter class="rounded-b-md border-t  p-4">
			<form class="flex items-center space-x-2 w-full" onsubmit={sendChat}>
				<Input
					id="message"
					bind:value={message}
					placeholder="Tapez votre message..."
					class="flex-grow rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<Button type="submit" variant="default" class="rounded-full p-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-white"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 12h14M12 5l7 7-7 7"
						/>
					</svg>
				</Button>
			</form>
		</CardFooter>
	</Card>
</div>
