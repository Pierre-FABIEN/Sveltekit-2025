// utils/cameraUtils.ts

import * as THREE from 'three';
import { cameraPosition, cameraTarget } from '$lib/store/ThreeStore/animationStores';

export function updateCamera(PerspectiveCameraRef: THREE.PerspectiveCamera, OrbitControlsRef: any) {
	const lerpFactor = 0.2;

	cameraPosition.subscribe((position) => {
		if (PerspectiveCameraRef) {
			// Use lerp to interpolate the camera position
			PerspectiveCameraRef.position.lerp(position, lerpFactor);
			PerspectiveCameraRef.updateProjectionMatrix();
		}
	});

	cameraTarget.subscribe((target) => {
		if (OrbitControlsRef) {
			// Use lerp to interpolate the camera target
			OrbitControlsRef.target.lerp(target, lerpFactor);
			OrbitControlsRef.update();
		}
	});
}
