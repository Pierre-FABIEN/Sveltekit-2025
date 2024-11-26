<script lang="ts">
	import { io } from 'socket.io-client';

	let { data } = $props();

	let participants = $state(data.participants);
	let message = $state('');
	let avatar = $state('https://via.placeholder.com/50'); // Default avatar URL
	let color = $state('#000000'); // Default participant color

	// Socket.io instance (initialized only once)
	let socket: any;
	// Générer un ID client unique
	const client_id = crypto.randomUUID();

	$effect(() => {
		// Initialiser la connexion avec le serveur
		socket = io('http://localhost:5000'); // Ne redéclarez pas `socket`

		socket.on('connect', () => {
			console.log('Connecté au serveur Socket.io');
		});

		socket.on('newParticipant', (participant) => {
			participants = [...participants, participant];
		});
	});

	function sendParticipant() {
		if (message.trim() !== '') {
			const data = { client_id, color, message, avatar };
			socket.emit('participant', data); // Utilise la variable globale `socket`
			message = ''; // Réinitialiser le message après envoi
		}
	}
</script>

<div>
	<h1>Chat des participants</h1>
	<ul>
		{#each participants as participant}
			<li>
				<img src={participant.avatar} alt="Avatar" />
				<span style="color: {participant.color}">{participant.message}</span>
			</li>
		{/each}
	</ul>
	<div>
		<input bind:value={message} placeholder="Votre message" />
		<input type="color" bind:value={color} title="Choisir une couleur" />
		<input type="url" bind:value={avatar} placeholder="Lien vers l'avatar" />
		<button onclick={sendParticipant}>Envoyer</button>
	</div>
</div>

<style>
	ul {
		list-style: none;
		padding: 0;
	}
	li {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}
	img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-right: 10px;
	}
</style>
