<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { PointLightHelper } from 'three';
	import type * as THREE from 'three';

	// Utilisation de $props pour récupérer les propriétés passées au composant
	let {
		color = '#FFA500', // Couleur de la flamme
		intensity = 2, // Intensité de la lumière
		position = [0, 1, 0], // Position de la lumière
		distance = 15, // Distance maximale d'éclairage
		decay = 2, // Atténuation naturelle de la lumière
		castShadow = true, // Activer ou désactiver les ombres
		helpers = false // Afficher ou masquer le helper
	}: {
		color: string;
		intensity: number;
		position: [number, number, number];
		distance: number;
		decay: number;
		castShadow: boolean;
		helpers: boolean;
	} = $props();

	// Références pour la lumière et le helper
	let flameLightRef: THREE.PointLight;
	let flameLightHelper: PointLightHelper;

	// Accéder à la scène via Threlte
	const { scene } = useThrelte();

	// Variables pour l'animation aléatoire
	let time = 0;
	let intensityVariation = intensity;
	let xOffset = position[0];
	let yOffset = position[1];
	let zOffset = position[2];

	// Création du helper si `helpers` est activé
	$effect(() => {
		if (helpers && flameLightRef) {
			flameLightHelper = new PointLightHelper(flameLightRef, 1, color);
			scene.add(flameLightHelper);
		}

		return () => {
			if (flameLightHelper) {
				scene.remove(flameLightHelper);
				flameLightHelper.dispose();
			}
		};
	});

	// Utilisation de `useTask` pour animer la flamme avec des variations aléatoires
	useTask((delta) => {
		if (!flameLightRef) return;

		// Mise à jour du temps pour des oscillations irrégulières
		time += delta;

		// Variation aléatoire de l'intensité
		intensityVariation = intensity + (Math.random() - 0.5) * 0.5;

		// Variation aléatoire de la position (scintillement)
		xOffset = position[0] + (Math.random() - 0.5) * 0.02;
		yOffset = position[1] + 0.05 * Math.sin(time * 5) + (Math.random() - 0.5) * 0.02;
		zOffset = position[2] + (Math.random() - 0.5) * 0.02;

		// Appliquer les nouvelles valeurs
		flameLightRef.intensity = intensityVariation;
		flameLightRef.position.set(xOffset, yOffset, zOffset);

		// Mise à jour du helper si activé
		if (helpers && flameLightHelper) {
			flameLightHelper.update();
		}
	});
</script>

<!-- PointLight configurée pour la flamme -->
<T.PointLight
	bind:ref={flameLightRef}
	{color}
	{intensity}
	{position}
	{distance}
	{decay}
	{castShadow}
/>
