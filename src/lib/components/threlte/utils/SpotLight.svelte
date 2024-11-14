<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { TransformControls } from '@threlte/extras';
	import { SpotLightHelper, Object3D } from 'three';
	import type * as THREE from 'three';

	// Props
	export let helpers: boolean = true; // Afficher ou masquer le helper
	export let intensity: number = 1; // Intensité de la lumière
	export let position: [number, number, number] = [0, 10, 0]; // Position de la lumière
	export let angle: number = Math.PI / 8; // Angle du faisceau
	export let penumbra: number = 0.5; // Douceur du bord
	export let distance: number = 20; // Distance maximale d'éclairage
	export let targetRef: THREE.Object3D | null = null; // Référence de la cible
	export let targetPosition: [number, number, number] = [0, 0, 0]; // Position de la cible

	// Accéder à la scène via Threlte
	const { scene } = useThrelte();

	// Références pour la lumière et le helper
	let spotLightRef: THREE.SpotLight;
	let spotLightHelper: SpotLightHelper;
	let defaultTargetRef: THREE.Object3D = new Object3D();

	// Si aucun `targetRef` n'est fourni, utiliser la référence par défaut
	$: activeTargetRef = targetRef || defaultTargetRef;

	// Ajouter la cible à la scène uniquement si `helpers` est activé
	if (!targetRef) {
		defaultTargetRef.position.set(...targetPosition);
		if (!scene.children.includes(defaultTargetRef)) {
			scene.add(defaultTargetRef);
		}
	}

	// Mettre à jour la position de la cible si `targetPosition` change
	$: {
		if (activeTargetRef) {
			activeTargetRef.position.set(...targetPosition);
			activeTargetRef.updateMatrixWorld();
		}
	}
</script>

<!-- SpotLight avec helper optionnel -->
<T.SpotLight
	bind:ref={spotLightRef}
	color="#FFFFFF"
	{intensity}
	{position}
	castShadow
	{angle}
	{penumbra}
	{distance}
	target={activeTargetRef}
	oncreate={() => {
		// Créer le helper si `helpers` est activé
		if (helpers) {
			spotLightHelper = new SpotLightHelper(spotLightRef);
			scene.add(spotLightHelper);
		}

		// Mettre à jour la cible de la lumière
		spotLightRef.target = activeTargetRef;
		spotLightRef.target.updateMatrixWorld();
		spotLightHelper?.update();
	}}
	ondestroy={() => {
		// Nettoyer le helper et la cible de la scène
		if (spotLightHelper) {
			scene.remove(spotLightHelper);
			spotLightHelper.dispose();
		}
		if (!targetRef && scene.children.includes(defaultTargetRef)) {
			scene.remove(defaultTargetRef);
		}
	}}
/>

<!-- Contrôle de transformation pour manipuler la SpotLight -->
{#if helpers}
	<TransformControls
		object={spotLightRef}
		onobjectChange={() => {
			spotLightHelper?.update(); // Mettre à jour le helper après transformation
		}}
	/>

	<!-- Contrôle de transformation pour manipuler la cible de la SpotLight -->
	<TransformControls
		object={activeTargetRef}
		onobjectChange={() => {
			// Mettre à jour la cible de la lumière et le helper
			spotLightRef.target.updateMatrixWorld();
			spotLightHelper?.update();
		}}
	/>
{/if}
