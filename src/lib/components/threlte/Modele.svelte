<script lang="ts">
	import { Group, Object3D } from 'three';
	import * as THREE from 'three';
	import { T, useTask } from '@threlte/core';
	import { useDraco, useGltf } from '@threlte/extras';

	export const ref = new Group();
	const dracoLoader = useDraco('/draco/');

	const gltf = useGltf('/models/modeleDraco.glb', { dracoLoader });
	let { devLettersIntensity, musicLettersIntensity } = $props();

	// Références des objets
	let synthNode: THREE.Object3D | null = $state(null);
	let keyboardNode: THREE.Object3D | null = $state(null);
	let nodesInitialized = false;

	let letterD: THREE.Mesh | null = $state(null);
	let letterE: THREE.Mesh | null = $state(null);
	let letterV: THREE.Mesh | null = $state(null);

	let letterM: THREE.Mesh | null = $state(null);
	let letterU: THREE.Mesh | null = $state(null);
	let letterS: THREE.Mesh | null = $state(null);
	let letterI: THREE.Mesh | null = $state(null);
	let letterC: THREE.Mesh | null = $state(null);

	let devLight: THREE.PointLight | null = $state(null);
	let musicLight: THREE.PointLight | null = $state(null);

	// Initialisation des nœuds après le chargement de gltf
	async function initializeNodes() {
		if (!gltf) return;
		nodesInitialized = true;
	}

	$effect(() => {
		gltf.then(() => {
			initializeNodes();
		});
	});

	$effect(() => {
		// Appliquer l'émission lumineuse aux lettres 'DEV'
		const devEmissiveColor = new THREE.Color(0xff0000);
		if (letterD?.material instanceof THREE.MeshStandardMaterial) {
			letterD.material = letterD.material.clone(); // Cloner le matériau
			letterD.material.emissive = devEmissiveColor;
			letterD.material.emissiveIntensity = devLettersIntensity * 5;
		}
		if (letterE?.material instanceof THREE.MeshStandardMaterial) {
			letterE.material = letterE.material.clone();
			letterE.material.emissive = devEmissiveColor;
			letterE.material.emissiveIntensity = devLettersIntensity * 5;
		}
		if (letterV?.material instanceof THREE.MeshStandardMaterial) {
			letterV.material = letterV.material.clone();
			letterV.material.emissive = devEmissiveColor;
			letterV.material.emissiveIntensity = devLettersIntensity * 5;
		}

		// Appliquer l'émission lumineuse aux lettres 'MUSIC'
		const musicEmissiveColor = new THREE.Color(0x00ff00);
		if (letterM?.material instanceof THREE.MeshStandardMaterial) {
			letterM.material = letterM.material.clone();
			letterM.material.emissive = musicEmissiveColor;
			letterM.material.emissiveIntensity = musicLettersIntensity * 0.5;
		}
		if (letterU?.material instanceof THREE.MeshStandardMaterial) {
			letterU.material = letterU.material.clone();
			letterU.material.emissive = musicEmissiveColor;
			letterU.material.emissiveIntensity = musicLettersIntensity * 0.5;
		}
		if (letterS?.material instanceof THREE.MeshStandardMaterial) {
			letterS.material = letterS.material.clone();
			letterS.material.emissive = musicEmissiveColor;
			letterS.material.emissiveIntensity = musicLettersIntensity * 0.5;
		}
		if (letterI?.material instanceof THREE.MeshStandardMaterial) {
			letterI.material = letterI.material.clone();
			letterI.material.emissive = musicEmissiveColor;
			letterI.material.emissiveIntensity = musicLettersIntensity * 0.5;
		}
		if (letterC?.material instanceof THREE.MeshStandardMaterial) {
			letterC.material = letterC.material.clone();
			letterC.material.emissive = musicEmissiveColor;
			letterC.material.emissiveIntensity = musicLettersIntensity * 0.5;
		}
	});

	// Tâche pour animer les objets seulement si les nœuds sont initialisés
	useTask((delta) => {
		if (!nodesInitialized || !synthNode || !keyboardNode) return;
		synthNode.rotation.x = 0.8;
		keyboardNode.rotation.x = -0.8;
		// Appliquer la rotation
		synthNode.rotation.y += delta * 0.5;
		keyboardNode.rotation.y += delta * 0.5;
	});
</script>

<T is={ref} dispose={false}>
	{#await gltf}
		<slot name="fallback" />
	{:then gltf}
		<T.Mesh
			castShadow
			receiveShadow
			geometry={gltf.nodes.Desk.geometry}
			material={gltf.nodes.Desk.material}
			position={[4.62, 1.02, -6.8]}
			rotation={[-1.57, -0.01, -0.55]}
			scale={1.8}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			geometry={gltf.nodes.Ground.geometry}
			material={gltf.nodes.Ground.material}
			scale={[50, 1, 50]}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			geometry={gltf.nodes.Human.geometry}
			material={gltf.nodes.Human.material}
			position={[0.32, 2.99, 0.28]}
			rotation={[2.42, 0.76, -1.98]}
			scale={0.15}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			geometry={gltf.nodes.Humans.geometry}
			material={gltf.nodes.Humans.material}
			position={[-20, 0, 0]}
			scale={2}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			geometry={gltf.nodes.Keyboard.geometry}
			material={gltf.nodes.Keyboard.material}
			position={[0.18, 3, -1.65]}
			rotation={[Math.PI / 2, 0, -Math.PI / 2]}
			scale={5}
			bind:ref={keyboardNode}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			geometry={gltf.nodes.Piano.geometry}
			material={gltf.nodes.Piano.material}
			position={[4.6, 0.72, 6.85]}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			geometry={gltf.nodes.Synth.geometry}
			material={gltf.nodes.Synth.material}
			position={[0, 3, 1.7]}
			rotation={[Math.PI / 2, 0, -Math.PI / 2]}
			scale={0.1}
			bind:ref={synthNode}
		/>

		<T.Mesh
			castShadow
			receiveShadow
			bind:ref={letterD}
			geometry={gltf.nodes.letterD.geometry}
			material={gltf.nodes.letterD.material}
			position={[3.44, 1.65, -8.21]}
			rotation={[Math.PI / 2, 0, 0.68]}
			scale={[0.57, 0.66, 0.49]}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			bind:ref={letterE}
			geometry={gltf.nodes.letterE.geometry}
			material={gltf.nodes.letterE.material}
			position={[4.15, 1.8, -7.68]}
			rotation={[Math.PI / 2, 0, 0.68]}
			scale={[0.57, 0.66, 0.49]}
		/>

		<T.Mesh
			castShadow
			receiveShadow
			bind:ref={letterV}
			geometry={gltf.nodes.letterV.geometry}
			material={gltf.nodes.letterV.material}
			position={[4.75, 2.01, -7.21]}
			rotation={[Math.PI / 2, 0, 0.68]}
			scale={[0.57, 0.66, 0.49]}
		/>

		<T.Mesh
			castShadow
			receiveShadow
			bind:ref={letterM}
			geometry={gltf.nodes.letterM.geometry}
			material={gltf.nodes.letterM.material}
			position={[5.36, 1.64, 6.74]}
			rotation={[1.48, -0.2, 1.92]}
			scale={[0.49, 0.52, 0.64]}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			bind:ref={letterU}
			geometry={gltf.nodes.letterU.geometry}
			material={gltf.nodes.letterU.material}
			position={[5.2, 1.78, 7.98]}
			rotation={[1.44, -0.31, -1.11]}
			scale={[0.49, 0.52, 0.64]}
		/>

		<T.Mesh
			castShadow
			receiveShadow
			bind:ref={letterS}
			geometry={gltf.nodes.letterS.geometry}
			material={gltf.nodes.letterS.material}
			position={[4.69, 2.35, 8.9]}
			rotation={[1.41, -0.2, 1.94]}
			scale={[0.49, 0.52, 0.64]}
		/>
		<T.Mesh
			castShadow
			receiveShadow
			bind:ref={letterI}
			geometry={gltf.nodes.letterI.geometry}
			material={gltf.nodes.letterI.material}
			position={[4.1, 2.34, 9.21]}
			rotation={[1.57, -0.43, 1.99]}
			scale={[0.49, 0.52, 0.64]}
		/>

		<T.Mesh
			castShadow
			receiveShadow
			bind:ref={letterC}
			geometry={gltf.nodes.letterC.geometry}
			material={gltf.nodes.letterC.material}
			position={[4.19, 2.3, 9.97]}
			rotation={[1.34, -0.11, 2.31]}
			scale={[0.49, 0.52, 0.64]}
		/>

		<T.PointLight
			bind:ref={devLight}
			intensity={devLettersIntensity * 2}
			color="#FF0000"
			position={[3.5, 2, -7]}
			distance={10}
			castShadow
			receiveShadow
		/>
		<T.PointLight
			bind:ref={musicLight}
			intensity={musicLettersIntensity * 2}
			color="#00FF00"
			position={[5, 2, 8]}
			distance={10}
			castShadow
			receiveShadow
		/>
	{:catch error}
		<slot name="error" {error} />
	{/await}

	<slot {ref} />
</T>
