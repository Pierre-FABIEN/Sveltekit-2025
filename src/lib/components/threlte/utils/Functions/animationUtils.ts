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
	PrincipalLightIntensity,
	FlameIntensity,
	desiredCameraPosition,
	desiredTarget
} from '$lib/store/ThreeStore/animationStores';

// Fonction pour gérer le retour fluide de la caméra et des lumières
export function smoothReturnToCenter(
	PerspectiveCameraRef: THREE.PerspectiveCamera | undefined,
	OrbitControlsRef: any
) {
	const animationSpeed = 0.1; // Ajuste cette valeur pour une transition plus ou moins rapide

	function animate() {
		if (get(disableAnimationsHome)) return;

		// Interpolation progressive vers les valeurs cibles
		leftSpotLightIntensity.set(
			THREE.MathUtils.lerp(get(leftSpotLightIntensity), get(targetLeftIntensity), animationSpeed)
		);
		rightSpotLightIntensity.set(
			THREE.MathUtils.lerp(get(rightSpotLightIntensity), get(targetRightIntensity), animationSpeed)
		);
		PrincipalLightIntensity.set(
			THREE.MathUtils.lerp(get(PrincipalLightIntensity), 70, animationSpeed)
		);
		FlameIntensity.set(THREE.MathUtils.lerp(get(FlameIntensity), 1, animationSpeed));

		if (PerspectiveCameraRef) {
			PerspectiveCameraRef.position.lerp(get(desiredCameraPosition), animationSpeed);
			PerspectiveCameraRef.lookAt(get(desiredTarget));
			PerspectiveCameraRef.updateProjectionMatrix();
		}

		if (OrbitControlsRef) {
			OrbitControlsRef.target.lerp(get(desiredTarget), animationSpeed);
			OrbitControlsRef.update();
		}

		// Continuer l'animation jusqu'à ce que les valeurs cibles soient atteintes
		if (
			Math.abs(get(leftSpotLightIntensity) - get(targetLeftIntensity)) > 0.01 ||
			Math.abs(get(rightSpotLightIntensity) - get(targetRightIntensity)) > 0.01 ||
			OrbitControlsRef?.target.distanceTo(get(desiredTarget)) > 0.1 ||
			(PerspectiveCameraRef &&
				PerspectiveCameraRef.position.distanceTo(get(desiredCameraPosition)) > 0.1)
		) {
			requestAnimationFrame(animate);
		}
	}

	// Démarrer l'animation
	animate();
}

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
				THREE.MathUtils.lerp(get(leftSpotLightIntensity), get(targetLeftIntensity), 0.1)
			);
			rightSpotLightIntensity.set(
				THREE.MathUtils.lerp(get(rightSpotLightIntensity), get(targetRightIntensity), 0.1)
			);

			if (OrbitControlsRef && OrbitControlsRef.target) {
				OrbitControlsRef.target.lerp(get(desiredTarget), 0.1);
			}

			if (PerspectiveCameraRef) {
				PerspectiveCameraRef.position.lerp(get(desiredCameraPosition), 0.1);
				PerspectiveCameraRef.updateProjectionMatrix();
			}

			OrbitControlsRef?.update();
		}
	}

	// Démarrer l'animation
	animate();
}
