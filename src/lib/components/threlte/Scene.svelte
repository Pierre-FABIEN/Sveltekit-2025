<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Modele from './Modele.svelte';
	import SpotLight from './utils/SpotLight.svelte';
	import * as THREE from 'three';
	import FlameLight from './utils/FlameLight.svelte';
	import { tick } from 'svelte';

	let PerspectiveCameraRef = $state<THREE.PerspectiveCamera | undefined>(undefined);
	let OrbitControlsRef = $state<any | undefined>(undefined);

	let isMouseOutside = false;
	let mousePercentage: number = $state(0);
	let desiredTarget = new THREE.Vector3(0, 2, 0);
	let desiredCameraPosition = new THREE.Vector3(-25, 7, 0);

	// Intensité des lumières avec interpolation
	let leftSpotLightIntensity: number = $state(0);
	let rightSpotLightIntensity: number = $state(0);
	let targetLeftIntensity: number = $state(0);
	let targetRightIntensity: number = $state(0);

	let devLettersIntensity: number = $state(0);
	let musicLettersIntensity: number = $state(0);

	// Variable pour activer/désactiver les animations
	let disableAnimations: boolean = false;

	// Fonction pour détecter la position de la souris et calculer le pourcentage
	function handleMouseMove(event: MouseEvent) {
		if (disableAnimations) return;

		const mouseX = event.clientX;
		const windowWidth = window.innerWidth;

		mousePercentage = mouseX / windowWidth;
		isMouseOutside = false;

		updateDesiredPositions();
		updateLightIntensityTargets();
	}

	// Fonction pour détecter si la souris quitte la fenêtre
	function handleMouseOut(event: MouseEvent) {
		if (!event.relatedTarget || disableAnimations) {
			isMouseOutside = true;
			updateDesiredPositions();
			updateLightIntensityTargets();
		}
	}

	// Fonction pour détecter si la souris entre dans la fenêtre
	function handleMouseEnter() {
		if (!disableAnimations) {
			isMouseOutside = false;
			updateDesiredPositions();
			updateLightIntensityTargets();
		}
	}

	// Mettre à jour les positions désirées
	function updateDesiredPositions() {
		if (disableAnimations) return;

		if (isMouseOutside) {
			desiredTarget.set(0, 2, 0);
			desiredCameraPosition.set(-25, 7, 0);
		} else {
			const targetZ = THREE.MathUtils.lerp(-5, 5, mousePercentage);
			desiredTarget.set(0, 2, targetZ);

			const cameraX = THREE.MathUtils.lerp(-25, -25, 1 - mousePercentage);
			const cameraZ = THREE.MathUtils.lerp(-6, 6, 1 - mousePercentage);
			desiredCameraPosition.set(cameraX, 7, cameraZ);
		}
	}

	// Mettre à jour les cibles d'intensité des lumières
	function updateLightIntensityTargets() {
		if (disableAnimations) return;

		const centerMargin = 0.2;

		if (isMouseOutside) {
			targetLeftIntensity = 0;
			targetRightIntensity = 0;
			devLettersIntensity = 0;
			musicLettersIntensity = 0;
		} else if (mousePercentage < 0.5 - centerMargin) {
			// La souris est à gauche, on allume 'DEV'
			targetLeftIntensity = 70;
			targetRightIntensity = 0;
			devLettersIntensity = 1;
			musicLettersIntensity = 0;
		} else if (mousePercentage > 0.5 + centerMargin) {
			// La souris est à droite, on allume 'MUSIC'
			targetLeftIntensity = 0;
			targetRightIntensity = 70;
			devLettersIntensity = 0;
			musicLettersIntensity = 1;
		} else {
			// La souris est au centre
			targetLeftIntensity = 0;
			targetRightIntensity = 0;
			devLettersIntensity = 0;
			musicLettersIntensity = 0;
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

		if (OrbitControlsRef && OrbitControlsRef.target) {
			OrbitControlsRef.target.lerp(desiredTarget, 0.1);
		}

		if (PerspectiveCameraRef) {
			PerspectiveCameraRef.position.lerp(desiredCameraPosition, 0.1);
			PerspectiveCameraRef.updateProjectionMatrix();
		}

		OrbitControlsRef.update();
	}

	// Démarrer l'animation
	$effect(() => {
		if (!disableAnimations) {
			tick().then(() => {
				animate();
			});
		}
	});
</script>

<Canvas>
	<T.PerspectiveCamera bind:ref={PerspectiveCameraRef} makeDefault position={[-25, 7, 0]} fov={15}>
		<OrbitControls
			bind:ref={OrbitControlsRef}
			autoRotate={false}
			enableRotate={false}
			enableZoom={false}
			enablePan={false}
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

	<Modele {devLettersIntensity} {musicLettersIntensity} />
</Canvas>

<svelte:window
	onmousemove={handleMouseMove}
	onmouseout={handleMouseOut}
	onmouseenter={handleMouseEnter}
/>
