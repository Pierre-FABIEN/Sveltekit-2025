<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Modele from './Modele.svelte';
	import SpotLight from './utils/SpotLight.svelte';
	import * as THREE from 'three';
	import FlameLight from './utils/FlameLight.svelte';

	let PerspectiveCameraRef: THREE.PerspectiveCamera;
	let OrbitControlsRef: any;

	let isMouseOutside = false;
	let mousePercentage = 0;
	let desiredTarget = new THREE.Vector3(0, 2, 0);
	let desiredCameraPosition = new THREE.Vector3(-25, 7, 0);

	// Fonction pour détecter la position de la souris et calculer le pourcentage
	function handleMouseMove(event: MouseEvent) {
		const mouseX = event.clientX;
		const windowWidth = window.innerWidth;

		mousePercentage = mouseX / windowWidth;
		isMouseOutside = false; // Réinitialiser lorsque la souris est à l'intérieur

		updateDesiredPositions();
	}

	// Fonction pour détecter si la souris quitte la fenêtre
	function handleMouseOut(event: MouseEvent) {
		if (!event.relatedTarget) {
			isMouseOutside = true;
			updateDesiredPositions();
		}
	}

	// Fonction pour détecter si la souris entre dans la fenêtre
	function handleMouseEnter() {
		isMouseOutside = false;
		updateDesiredPositions();
	}

	// Mettre à jour les positions désirées
	function updateDesiredPositions() {
		if (isMouseOutside) {
			// Réinitialiser la cible et la caméra lorsque la souris est en dehors
			desiredTarget.set(0, 2, 0);
			desiredCameraPosition.set(-25, 7, 0);
		} else {
			// Interpoler la position de la cible et inverser le mouvement de la caméra
			const targetZ = THREE.MathUtils.lerp(-5, 5, mousePercentage);
			desiredTarget.set(0, 2, targetZ);

			// Déplacer la caméra vers la direction opposée
			const cameraX = THREE.MathUtils.lerp(-20, -20, 1 - mousePercentage);
			const cameraZ = THREE.MathUtils.lerp(-10, 10, 1 - mousePercentage);
			desiredCameraPosition.set(cameraX, 7, cameraZ);
		}
	}

	// Fonction d'animation continue
	function animate() {
		requestAnimationFrame(animate);

		// Interpoler vers les positions désirées
		OrbitControlsRef.target.lerp(desiredTarget, 0.1);
		PerspectiveCameraRef.position.lerp(desiredCameraPosition, 0.1);

		// Mettre à jour la caméra et les contrôles
		PerspectiveCameraRef.updateProjectionMatrix();
		OrbitControlsRef.update();
	}

	// Démarrer l'animation
	$effect(() => {
		animate();
	});
</script>

<Canvas>
	<T.PerspectiveCamera bind:ref={PerspectiveCameraRef} makeDefault position={[-25, 7, 0]} fov={15}>
		<OrbitControls
			bind:ref={OrbitControlsRef}
			autoRotate={false}
			enableZoom={true}
			enableDamping={true}
			target={[0, 2, 0]}
		/>
	</T.PerspectiveCamera>

	<FlameLight
		color="#FFA500"
		intensity={1}
		position={[-0.25, 2.75, 0]}
		distance={0.8}
		decay={1}
		castShadow={true}
		helpers={false}
	/>

	<SpotLight
		helpers={false}
		intensity={70}
		position={[0, 10, 0]}
		angle={Math.PI / 7}
		penumbra={0.5}
		distance={50}
		targetPosition={[0, 0, 0]}
	/>

	<SpotLight
		helpers={false}
		intensity={70}
		position={[0, 10, 0]}
		angle={Math.PI / 7}
		penumbra={0.5}
		distance={50}
		targetPosition={[5, 0, 10]}
	/>

	<SpotLight
		helpers={false}
		intensity={70}
		position={[0, 10, 0]}
		angle={Math.PI / 7}
		penumbra={0.5}
		distance={50}
		targetPosition={[5, 0, -10]}
	/>

	<Modele />
</Canvas>

<svelte:window
	onmousemove={handleMouseMove}
	onmouseout={handleMouseOut}
	onmouseenter={handleMouseEnter}
/>
