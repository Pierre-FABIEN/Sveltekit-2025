<script lang="ts">
	import { T, useThrelte } from '@threlte/core';
	import { Portal, TransformControls } from '@threlte/extras';
	import { DirectionalLightHelper, Object3D } from 'three';
	import type * as THREE from 'three';

	// Accéder à la scène via Threlte
	const { scene } = useThrelte();

	// Référence pour la lumière et le helper
	let lightRef: THREE.DirectionalLight;
	let lightHelper: DirectionalLightHelper;
	let targetRef: THREE.Object3D;

	// Initialiser la cible de la lumière
	targetRef = new Object3D();
	targetRef.position.set(4, 1, 5);
	scene.add(targetRef);
</script>

<!-- Lumière directionnelle principale avec helper -->
<T.DirectionalLight
	bind:ref={lightRef}
	color="#FFFFFF"
	intensity={1}
	position={[5, 10, 5]}
	castShadow
	target={targetRef}
	oncreate={() => {
		// Créer le helper pour la lumière
		lightHelper = new DirectionalLightHelper(lightRef, 1);
		scene.add(lightHelper);
	}}
	ondestroy={() => {
		// Nettoyer le helper de la scène lors de la destruction du composant
		if (lightHelper) {
			scene.remove(lightHelper);
			lightHelper.dispose();
		}
		// Supprimer la cible de la scène
		scene.remove(targetRef);
	}}
/>

<!-- Contrôle de transformation pour manipuler la lumière -->
<TransformControls
	object={lightRef}
	onobjectChange={() => {
		if (lightHelper) {
			lightHelper.update(); // Mettre à jour le helper après transformation
		}
	}}
/>

<!-- Contrôle de transformation pour manipuler la cible de la lumière -->
<TransformControls
	object={targetRef}
	onobjectChange={() => {
		// Mettre à jour le helper et la lumière directionnelle
		lightRef.target.updateMatrixWorld();
		if (lightHelper) {
			lightHelper.update();
		}
	}}
/>
