export const generateColor = (clientId: string): string => {
	let hash = 0;
	for (let i = 0; i < clientId.length; i++) {
		hash = clientId.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';
	for (let i = 0; i < 3; i++) {
		// Limiter les composantes RGB pour générer une couleur sombre
		const value = (hash >> (i * 8)) & 0xff;
		const darkValue = Math.floor(value / 2); // Réduire la valeur pour rester dans une plage sombre
		color += ('00' + darkValue.toString(16)).slice(-2);
	}
	return color;
};

// Génération d'URL d'avatar
export const generateAvatar = (clientId: string): string => {
	return `https://robohash.org/${encodeURIComponent(clientId)}?size=50x50`;
};
