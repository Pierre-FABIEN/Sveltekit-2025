<script lang="ts">
	import { tick } from 'svelte';

	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	import * as THREE from 'three';
	import { Canvas } from '@threlte/core';
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';

	import Modele from './Modele.svelte';
	import SpotLight from './utils/Light/SpotLight.svelte';
	import FlameLight from './utils/Light/FlameLight.svelte';
	import { updateCamera } from './utils/Functions/cameraUtils';

	// Import des stores
	import {
		disableAnimationsHome,
		desiredTarget,
		desiredCameraPosition,
		leftSpotLightIntensity,
		rightSpotLightIntensity,
		targetLeftIntensity,
		targetRightIntensity,
		devLettersIntensity,
		musicLettersIntensity,
		PrincipalLightIntensity,
		FlameIntensity
	} from '$store/ThreeStore/animationStores';

	// Import des fonctions déplacées
	import { smoothReturnToCenter, startAnimationLoop } from './utils/Functions/animationUtils';

	import {
		handleMouseEnter,
		handleMouseMove,
		handleMouseOut
	} from './utils/Functions/mouseHandlers';

	gsap.registerPlugin(ScrollTrigger);

	let PerspectiveCameraRef = $state<THREE.PerspectiveCamera | undefined>(undefined);
	let OrbitControlsRef = $state<any | undefined>(undefined);

	disableAnimationsHome.subscribe((disable) => {
		if (disable) {
			// Mettre à jour les valeurs cibles pour la caméra et les lumières
			desiredTarget.set(new THREE.Vector3(0, 2, 0));
			desiredCameraPosition.set(new THREE.Vector3(-25, 7, 0));
			targetLeftIntensity.set(0);
			targetRightIntensity.set(0);
			rightSpotLightIntensity.set(0);
			leftSpotLightIntensity.set(0);
			devLettersIntensity.set(0);
			musicLettersIntensity.set(0);

			// Démarrer un retour fluide vers la position centrale et les valeurs d'intensité par interpolation
			smoothReturnToCenter(PerspectiveCameraRef, OrbitControlsRef);
		} else {
			// Arrêter toute animation en cours
			console.log('Animations désactivées');
		}
	});

	// Démarrer l'animation
	$effect(() => {
		if (!$disableAnimationsHome) {
			tick().then(() => {
				startAnimationLoop(PerspectiveCameraRef, OrbitControlsRef);
				if (PerspectiveCameraRef) {
					updateCamera(PerspectiveCameraRef, OrbitControlsRef);
				}
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
		intensity={$FlameIntensity}
		position={[-0.25, 2.75, 0]}
		distance={0.8}
		decay={1}
		castShadow={true}
		helpers={false}
	/>

	<!-- Lumière principale -->
	<SpotLight
		helpers={false}
		intensity={$PrincipalLightIntensity}
		position={[0, 10, 0]}
		angle={Math.PI / 7}
		penumbra={0.5}
		distance={50}
		targetPosition={[0, 0, 0]}
	/>

	<!-- SpotLight droite (intensité interpolée) -->
	<SpotLight
		helpers={false}
		intensity={$rightSpotLightIntensity}
		position={[0, 10, 0]}
		angle={Math.PI / 7}
		penumbra={0.5}
		distance={50}
		targetPosition={[5, 0, 10]}
	/>

	<!-- SpotLight gauche (intensité interpolée) -->
	<SpotLight
		helpers={false}
		intensity={$leftSpotLightIntensity}
		position={[0, 10, 0]}
		angle={Math.PI / 7}
		penumbra={0.5}
		distance={50}
		targetPosition={[5, 0, -10]}
	/>

	<Modele
		devLettersIntensity={$devLettersIntensity}
		musicLettersIntensity={$musicLettersIntensity}
	/>
</Canvas>

<svelte:window
	on:mousemove={handleMouseMove}
	on:mouseout={handleMouseOut}
	on:mouseenter={handleMouseEnter}
/>
