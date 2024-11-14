<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Modele from './Modele.svelte';
	import SpotLight from './utils/SpotLight.svelte';
	import * as THREE from 'three';
	import FlameLight from './utils/FlameLight.svelte';

	let PerspectiveCameraRef = $state<THREE.PerspectiveCamera | undefined>(undefined);
	let OrbitControlsRef = $state<any | undefined>(undefined);

	let isMouseOutside = false;
	let mousePercentage = 0;
	let desiredTarget = new THREE.Vector3(0, 2, 0);
	let desiredCameraPosition = new THREE.Vector3(-25, 7, 0);

	// Intensité des lumières avec interpolation
	let leftSpotLightIntensity = $state(0);
	let rightSpotLightIntensity = $state(0);
	let targetLeftIntensity = 0;
	let targetRightIntensity = 0;

	// Fonction pour détecter la position de la souris et calculer le pourcentage
	function handleMouseMove(event: MouseEvent) {
		const mouseX = event.clientX;
		const windowWidth = window.innerWidth;

		mousePercentage = mouseX / windowWidth;
		isMouseOutside = false;

		updateDesiredPositions();
		updateLightIntensityTargets();
	}

	// Fonction pour détecter si la souris quitte la fenêtre
	function handleMouseOut(event: MouseEvent) {
		if (!event.relatedTarget) {
			isMouseOutside = true;
			updateDesiredPositions();
			updateLightIntensityTargets();
		}
	}

	// Fonction pour détecter si la souris entre dans la fenêtre
	function handleMouseEnter() {
		isMouseOutside = false;
		updateDesiredPositions();
		updateLightIntensityTargets();
	}

	// Mettre à jour les positions désirées
	function updateDesiredPositions() {
		if (isMouseOutside) {
			desiredTarget.set(0, 2, 0);
			desiredCameraPosition.set(-25, 7, 0);
		} else {
			const targetZ = THREE.MathUtils.lerp(-5, 5, mousePercentage);
			desiredTarget.set(0, 2, targetZ);

			const cameraX = THREE.MathUtils.lerp(-27, -23, 1 - mousePercentage);
			const cameraZ = THREE.MathUtils.lerp(-4, 4, 1 - mousePercentage);
			desiredCameraPosition.set(cameraX, 7, cameraZ);
		}
	}

	// Mettre à jour les cibles d'intensité des lumières
	function updateLightIntensityTargets() {
		const centerMargin = 0.2;

		if (isMouseOutside) {
			targetLeftIntensity = 0;
			targetRightIntensity = 0;
		} else if (mousePercentage < 0.5 - centerMargin) {
			// La souris est à gauche
			targetLeftIntensity = 70;
			targetRightIntensity = 0;
		} else if (mousePercentage > 0.5 + centerMargin) {
			// La souris est à droite
			targetLeftIntensity = 0;
			targetRightIntensity = 70;
		} else {
			// La souris est au centre
			targetLeftIntensity = 0;
			targetRightIntensity = 0;
		}
	}

	// Fonction d'animation continue
	function animate() {
		requestAnimationFrame(animate);

		// Interpolation pour une transition fluide des intensités
		leftSpotLightIntensity = THREE.MathUtils.lerp(leftSpotLightIntensity, targetLeftIntensity, 0.1);
		rightSpotLightIntensity = THREE.MathUtils.lerp(
			rightSpotLightIntensity,
			targetRightIntensity,
			0.1
		);

		// Interpoler les positions de la caméra et de la cible
		OrbitControlsRef.target.lerp(desiredTarget, 0.1);
		PerspectiveCameraRef.position.lerp(desiredCameraPosition, 0.1);

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

	<!-- Lumière principale -->
	<SpotLight
		helpers={false}
		intensity={70}
		position={[0, 10, 0]}
		angle={Math.PI / 7}
		penumbra={0.5}
		distance={50}
		targetPosition={[0, 0, 0]}
	/>

	<!-- SpotLight droite (intensité interpolée) -->
	<SpotLight
		helpers={false}
		intensity={rightSpotLightIntensity}
		position={[0, 10, 0]}
		angle={Math.PI / 7}
		penumbra={0.5}
		distance={50}
		targetPosition={[5, 0, 10]}
	/>

	<!-- SpotLight gauche (intensité interpolée) -->
	<SpotLight
		helpers={false}
		intensity={leftSpotLightIntensity}
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
