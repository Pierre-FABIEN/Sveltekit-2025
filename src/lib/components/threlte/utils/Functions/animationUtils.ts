// src/lib/utils/Functions/animationUtils.ts

import * as THREE from 'three';
import { get } from 'svelte/store';

// Import des stores nécessaires
import {
	disableAnimationsHome,
	leftSpotLightIntensity,
	rightSpotLightIntensity,
	targetLeftIntensity,
	targetRightIntensity,
	desiredCameraPosition,
	desiredTarget,
	lerpFactor
} from '$lib/store/ThreeStore/animationStores';

// Fonction d'animation continue
export function startAnimationLoop(
	PerspectiveCameraRef: THREE.PerspectiveCamera | undefined,
	OrbitControlsRef: any
) {
	function animate() {
		if (!get(disableAnimationsHome)) {
			requestAnimationFrame(animate);

			// Interpolation pour une transition fluide des intensités
			leftSpotLightIntensity.set(
				THREE.MathUtils.lerp(get(leftSpotLightIntensity), get(targetLeftIntensity), get(lerpFactor))
			);
			rightSpotLightIntensity.set(
				THREE.MathUtils.lerp(
					get(rightSpotLightIntensity),
					get(targetRightIntensity),
					get(lerpFactor)
				)
			);

			if (OrbitControlsRef && OrbitControlsRef.target) {
				OrbitControlsRef.target.lerp(get(desiredTarget), get(lerpFactor));
			}

			if (PerspectiveCameraRef) {
				PerspectiveCameraRef.position.lerp(get(desiredCameraPosition), get(lerpFactor));
				PerspectiveCameraRef.updateProjectionMatrix();
			}

			OrbitControlsRef?.update();
		}
	}

	// Démarrer l'animation
	animate();
}
