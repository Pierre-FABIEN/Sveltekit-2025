<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { TransformControls } from '@threlte/extras';
	import { PointLightHelper, Object3D } from 'three';
	import type * as THREE from 'three';

	// Récupération des props via $props
	let {
		helpers = true,
		intensity = 1,
		position = [0, 10, 0],
		distance = 20,
		decay = 1,
		targetRef = null,
		targetPosition = [0, 0, 0]
	} = $props();

	// Déclaration des types pour assurer la sécurité
	interface Props {
		helpers: boolean;
		intensity: number;
		position: [number, number, number];
		distance: number;
		decay: number;
		targetRef: THREE.Object3D | null;
		targetPosition: [number, number, number];
	}

	// Accéder à la scène via Threlte
	const { scene } = useThrelte();

	// Références pour la lumière et le helper
	let pointLightRef: THREE.PointLight;
	let pointLightHelper: PointLightHelper;
	const defaultTargetRef = new Object3D();

	// État réactif pour la cible active
	let activeTargetRef = $state<THREE.Object3D>((targetRef as THREE.Object3D) || defaultTargetRef);

	// Ajouter la cible par défaut si aucune n'est fournie
	$effect(() => {
		if (!targetRef) {
			activeTargetRef.position.set(...(targetPosition as [number, number, number]));
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
		if (helpers && pointLightHelper) {
			pointLightHelper.update();
		}
	});
</script>

<!-- PointLight avec helper optionnel -->
<T.PointLight
	bind:ref={pointLightRef}
	color="#FFFFFF"
	{intensity}
	{position}
	{distance}
	{decay}
	target={activeTargetRef}
	oncreate={() => {
		// Créer le helper si helpers est activé
		if (helpers) {
			pointLightHelper = new PointLightHelper(pointLightRef);
			scene.add(pointLightHelper);
		}

		// Mettre à jour la cible de la lumière
		pointLightRef.target = activeTargetRef;
		pointLightRef.target.updateMatrixWorld();
		pointLightHelper?.update();
	}}
	ondestroy={() => {
		// Nettoyer le helper et la cible de la scène
		if (pointLightHelper) {
			scene.remove(pointLightHelper);
			pointLightHelper.dispose();
		}
		if (!targetRef && scene.children.includes(defaultTargetRef)) {
			scene.remove(defaultTargetRef);
		}
	}}
/>

<!-- Contrôle de transformation pour manipuler le PointLight -->
{#if helpers}
	<TransformControls
		object={pointLightRef}
		onobjectChange={() => {
			pointLightHelper?.update(); // Mettre à jour le helper après transformation
		}}
	/>

	<!-- Contrôle de transformation pour manipuler la cible de la PointLight -->
	<TransformControls
		object={activeTargetRef}
		onobjectChange={() => {
			// Mettre à jour la cible de la lumière et le helper
			pointLightRef.target.updateMatrixWorld();
			pointLightHelper?.update();
		}}
	/>
{/if}
