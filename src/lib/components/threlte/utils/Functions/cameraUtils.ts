// utils/cameraUtils.ts

import * as THREE from 'three';
import { cameraPosition, cameraTarget, lerpFactor } from '$lib/store/ThreeStore/animationStores';
import { get } from 'svelte/store';

export function updateCamera(PerspectiveCameraRef: THREE.PerspectiveCamera, OrbitControlsRef: any) {
	const unsubscribePosition = cameraPosition.subscribe((position) => {
		if (PerspectiveCameraRef) {
			PerspectiveCameraRef.position.lerp(position, get(lerpFactor));
			PerspectiveCameraRef.updateProjectionMatrix();
		}
	});

	const unsubscribeTarget = cameraTarget.subscribe((target) => {
		if (OrbitControlsRef) {
			OrbitControlsRef.target.lerp(target, get(lerpFactor));
			OrbitControlsRef.update();
		}
	});

	// Retourner les fonctions de désabonnement
	return {
		unsubscribePosition,
		unsubscribeTarget
	};
}
