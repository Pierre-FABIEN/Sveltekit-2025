<script lang="ts">
	import { SocioClient } from 'socio/dist/core-client.js';
	import { writable, type Writable } from 'svelte/store';
	import { toast } from 'svelte-sonner';

	// Composants ShadCN
	import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '$shadcn/card';
	import { Button } from '$shadcn/button';
	import { Input } from '$shadcn/input';
	import { Avatar, AvatarImage, AvatarFallback } from '$shadcn/avatar';
	import { Label } from '$shadcn/label';
	import { ScrollArea } from '$shadcn/scroll-area';
	import { Separator } from '$shadcn/separator';
	import { SendHorizontal } from 'lucide-svelte';

	let sc: SocioClient;
	let participants: Writable<any[]> = writable([]);
	let newParticipant = { message: '' };
	let ready = false;

	// Connexion au Socio Server
	$: {
		sc = new SocioClient(`ws://${location.hostname}:3000`, {
			logging: { verbose: true },
			name: 'Main'
		});

		sc.ready()
			.then(() => {
				ready = true;
				toast.success('Connecté au serveur Socio !');

				// Abonnement à la table Participant
				const id = sc.Subscribe({ sql: `SELECT * FROM Participant;` }, (res) => {
					if (Array.isArray(res)) {
						participants.set(res);
					} else {
						console.error("On s'attend à un tableau de participants, mais on a reçu :", res);
					}
				});

				// Nettoyage à la destruction
				return () => {
					sc.Unsubscribe(id);
				};
			})
			.catch((error) => {
				console.error('Échec de la connexion au serveur Socio :', error);
				toast.error('Échec de la connexion au serveur Socio.');
			});
	}

	// Générer une couleur unique
	function generateColorFromString(str: string, alpha: number = 1): string {
		const hash = hashString(str);
		const hue = hash % 360; // Calcul de la teinte en fonction du hash
		return `hsl(${hue}deg 70% 50% / ${alpha * 50}%)`; // Alpha en pourcentage
	}

	function generateColorFromStringBorder(str: string): string {
		const hash = hashString(str);
		const hue = hash % 360;
		return `hsl(${hue}, 70%, 50%)`;
	}

	function hashString(str: string): number {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
			hash = hash & hash;
		}
		return Math.abs(hash);
	}

	async function addParticipant() {
		if (!newParticipant.message) {
			toast.error('Le message ne peut pas être vide !');
			return;
		}

		try {
			await sc.Query(
				`INSERT INTO Participant (client_id, color, message, avatar) VALUES (:client_id, :color, :message, :avatar);`,
				{
					client_id: sc.client_id,
					color: generateColorFromString(sc.client_id, 50),
					message: newParticipant.message,
					avatar: `https://api.dicebear.com/6.x/pixel-art/svg?seed=${encodeURIComponent(sc.client_id)}`
				}
			);
			toast.success('Participant ajouté avec succès !');
			newParticipant = { message: '' };
		} catch (error) {
			console.error("Échec de l'ajout du participant :", error);
			toast.error("Échec de l'ajout du participant !");
		}
	}
</script>

<main class="min-h-screen flex flex-col items-center p-6">
	{#if ready}
		<Card
			class="w-full shadow-lg bg-white/10 backdrop-blur-lg border border-gray-700 rounded-2xl border-white"
		>
			<CardHeader>
				<CardTitle class="text-2xl  font-bold">Chat Websocket</CardTitle>
			</CardHeader>
			<CardContent class="p-4">
				<ScrollArea class="h-96 rounded-lg /20 border border-gray-700 p-4">
					<ul class="space-y-4">
						{#each $participants as participant (participant.id)}
							<li
								style="
								width: 100%;
								display: flex;
								shadow-lg
								flex-direction: {participant.client_id === sc.client_id ? 'row-reverse' : 'row'}"
							>
								<div
									class="flex items-center p-4 rounded-lg shadow-md transition-transform transform"
									style="						
									border: 1px solid {generateColorFromStringBorder(participant.client_id)};		
									background-color: {generateColorFromString(participant.client_id)}; 
									
									
									width: fit-content;"
								>
									<div
										style=" flex-direction: {participant.client_id === sc.client_id
											? 'row-reverse'
											: 'row'}"
										class="flex items-center bg-shadow w-full h-full rounded-xl p-4 hover:bg-white/20 transition-all"
									>
										<!-- Avatar -->
										<Avatar class="flex-shrink-0">
											<AvatarImage src={participant.avatar} alt={participant.client_id} />
											<AvatarFallback
												>{participant.client_id.slice(0, 2).toUpperCase()}</AvatarFallback
											>
										</Avatar>

										<!-- Message -->
										<div class="ml-4">
											<p class=" text-sm">{participant.message}</p>
										</div>
									</div>
								</div>
							</li>
						{/each}
					</ul>
				</ScrollArea>
			</CardContent>

			<Separator class="border-gray-700" />
			<CardFooter class="p-4">
				<form
					on:submit|preventDefault={addParticipant}
					class="flex w-full items-center border border-gray-700 rounded-lg p-3 space-x-3"
				>
					<!-- Champ de saisie -->
					<div class="relative flex-1">
						<Label for="message" class="sr-only">Message</Label>
						<Input
							type="text"
							id="message"
							placeholder="Tapez votre message..."
							bind:value={newParticipant.message}
							class="w-full  border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500"
						/>
					</div>

					<!-- Bouton d'envoi -->
					<Button
						type="submit"
						class="bg-purple-500 hover:bg-purple-600 text-white font-medium px-4 py-2 rounded-lg flex items-center space-x-2"
					>
						<SendHorizontal />
					</Button>
				</form>
			</CardFooter>
		</Card>
	{:else}
		<p class="text-gray-300 text-lg animate-pulse">Connexion en cours...</p>
	{/if}
</main>
