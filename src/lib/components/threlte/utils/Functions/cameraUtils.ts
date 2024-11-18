// utils/cameraUtils.ts

import * as THREE from 'three';
import { get } from 'svelte/store';
import { cameraPosition, cameraTarget } from '$lib/store/cameraStore';

export function updateCamera(
	PerspectiveCameraRef: THREE.PerspectiveCamera,
	OrbitControlsRef: any,
	isControlledByScroll: boolean
) {
	const lerpFactor = 0.2;

	cameraPosition.subscribe((position) => {
		if (PerspectiveCameraRef && !isControlledByScroll) {
			// Use lerp to interpolate the camera position
			PerspectiveCameraRef.position.lerp(position, lerpFactor);
			PerspectiveCameraRef.updateProjectionMatrix();
		}
	});

	cameraTarget.subscribe((target) => {
		if (OrbitControlsRef && !isControlledByScroll) {
			// Use lerp to interpolate the camera target
			OrbitControlsRef.target.lerp(target, lerpFactor);
			OrbitControlsRef.update();
		}
	});
}
