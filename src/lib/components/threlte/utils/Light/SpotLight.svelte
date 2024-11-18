<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { TransformControls } from '@threlte/extras';
	import { SpotLightHelper, Object3D } from 'three';
	import type * as THREE from 'three';

	// Récupération des props via $props
	let {
		helpers = true,
		intensity = 1,
		position = [0, 10, 0],
		angle = Math.PI / 8,
		penumbra = 0.5,
		distance = 20,
		targetRef = null,
		targetPosition = [0, 0, 0]
	} = $props();

	// Déclaration des types pour assurer la sécurité
	interface Props {
		helpers: boolean;
		intensity: number;
		position: [number, number, number];
		angle: number;
		penumbra: number;
		distance: number;
		targetRef: THREE.Object3D | null;
		targetPosition: [number, number, number];
	}

	// Accéder à la scène via Threlte
	const { scene } = useThrelte();

	// Références pour la lumière et le helper
	let spotLightRef: THREE.SpotLight;
	let spotLightHelper: SpotLightHelper;
	const defaultTargetRef = new Object3D();

	// État réactif pour la cible active
	let activeTargetRef = $state<THREE.Object3D>((targetRef as THREE.Object3D) || defaultTargetRef);

	// Ajouter la cible par défaut si aucune n'est fournie
	$effect(() => {
		if (!targetRef) {
			defaultTargetRef.position.set(...(targetPosition as [number, number, number]));
			if (!scene.children.includes(defaultTargetRef)) {
				scene.add(defaultTargetRef);
			}
		}
	});

	// Mettre à jour la position de la cible de la lumière
	$effect(() => {
		activeTargetRef.position.set(...(targetPosition as [number, number, number]));
		activeTargetRef.updateMatrixWorld();
	});

	// Mettre à jour le helper lorsque les propriétés changent
	$effect(() => {
		if (helpers && spotLightHelper) {
			spotLightHelper.update();
		}
	});
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
		// Créer le helper si helpers est activé
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
