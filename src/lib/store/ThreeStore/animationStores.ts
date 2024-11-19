import { writable } from 'svelte/store';
import * as THREE from 'three';

// Création des stores
export const disableAnimationsHome = writable(false);
export const isMouseOutside = writable<boolean>(false);
export const mousePercentage = writable<number>(0);

export const desiredTarget = writable<THREE.Vector3>(new THREE.Vector3(0, 2, 0));
export const desiredCameraPosition = writable<THREE.Vector3>(new THREE.Vector3(-25, 7, 0));

export const leftSpotLightIntensity = writable<number>(0);
export const rightSpotLightIntensity = writable<number>(0);
export const targetLeftIntensity = writable<number>(0);
export const targetRightIntensity = writable<number>(0);
export const pointLightIntensity = writable<number>(0);

export const devLettersIntensity = writable<number>(0);
export const musicLettersIntensity = writable<number>(0);

export const PrincipalLightIntensity = writable<number>(70);
export const FlameIntensity = writable<number>(1);

export const cameraPosition = writable(new THREE.Vector3(-25, 7, 0));
export const cameraTarget = writable(new THREE.Vector3(0, 2, 0));

export const lerpFactor = writable<number>(0.2);

// Fonction pour activer le debugger
function createStoreDebugger() {
	const stores = {
		// disableAnimationsHome,
		// isMouseOutside,
		// mousePercentage,
		// desiredTarget,
		// desiredCameraPosition,
		// leftSpotLightIntensity,
		// rightSpotLightIntensity,
		// targetLeftIntensity,
		// targetRightIntensity,
		// pointLightIntensity,
		// devLettersIntensity,
		// musicLettersIntensity,
		// PrincipalLightIntensity,
		// FlameIntensity,
		// cameraPosition,
		// cameraTarget,
		lerpFactor
	};

	Object.entries(stores).forEach(([key, store]) => {
		store.subscribe((value) => {
			console.log(
				`%c[Store Update] %c${key}:`,
				'color: #0d6efd; font-weight: bold;',
				'color: #6c757d;',
				value instanceof THREE.Vector3
					? { x: value.x.toFixed(2), y: value.y.toFixed(2), z: value.z.toFixed(2) }
					: value
			);
		});
	});
}

// Active le debugger au chargement
createStoreDebugger();
