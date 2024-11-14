<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import Modele from './Modele.svelte';
	import SpotLight from './utils/SpotLight.svelte';
	import * as THREE from 'three';
	import FlameLight from './utils/FlameLight.svelte';

	let PerspectiveCameraRef: THREE.PerspectiveCamera;
</script>

<T.PerspectiveCamera bind:ref={PerspectiveCameraRef} makeDefault position={[-25, 7, 0]} fov={15}>
	<OrbitControls autoRotate={false} enableZoom={true} enableDamping={true} target={[0, 2, 0]} />
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
