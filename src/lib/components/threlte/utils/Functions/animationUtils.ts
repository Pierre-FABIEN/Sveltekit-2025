// utils/animationUtils.ts

import * as THREE from 'three';

export function smoothReturnToCenter(
	desiredTarget: THREE.Vector3,
	desiredCameraPosition: THREE.Vector3,
	PerspectiveCameraRef: THREE.PerspectiveCamera,
	OrbitControlsRef: any,
	leftSpotLightIntensity: number,
	rightSpotLightIntensity: number,
	targetLeftIntensity: number,
	targetRightIntensity: number,
	PrincipalLightIntensity: number,
	FlameIntensity: number,
	disableAnimationsHome: boolean
) {
	const animationSpeed = 0.1; // Adjust this value for faster or slower transitions

	function animate() {
		if (disableAnimationsHome) return;

		// Gradually interpolate towards the target values
		leftSpotLightIntensity = THREE.MathUtils.lerp(
			leftSpotLightIntensity,
			targetLeftIntensity,
			animationSpeed
		);
		rightSpotLightIntensity = THREE.MathUtils.lerp(
			rightSpotLightIntensity,
			targetRightIntensity,
			animationSpeed
		);
		PrincipalLightIntensity = THREE.MathUtils.lerp(PrincipalLightIntensity, 70, animationSpeed);
		FlameIntensity = THREE.MathUtils.lerp(FlameIntensity, 1, animationSpeed);

		if (PerspectiveCameraRef) {
			PerspectiveCameraRef.position.lerp(desiredCameraPosition, animationSpeed);
			PerspectiveCameraRef.lookAt(desiredTarget);
			PerspectiveCameraRef.updateProjectionMatrix();
		}

		if (OrbitControlsRef) {
			OrbitControlsRef.target.lerp(desiredTarget, animationSpeed);
			OrbitControlsRef.update();
		}

		// Continue the animation until the target values are reached
		if (
			Math.abs(leftSpotLightIntensity - targetLeftIntensity) > 0.01 ||
			Math.abs(rightSpotLightIntensity - targetRightIntensity) > 0.01 ||
			OrbitControlsRef?.target.distanceTo(desiredTarget) > 0.1 ||
			(desiredCameraPosition &&
				PerspectiveCameraRef &&
				PerspectiveCameraRef.position.distanceTo(desiredCameraPosition))
		) {
			requestAnimationFrame(animate);
		}
	}

	// Start the animation
	animate();
}

export function animate(
	disableAnimationsHome: boolean,
	leftSpotLightIntensity: number,
	rightSpotLightIntensity: number,
	targetLeftIntensity: number,
	targetRightIntensity: number,
	OrbitControlsRef: any,
	desiredTarget: THREE.Vector3,
	PerspectiveCameraRef: THREE.PerspectiveCamera,
	desiredCameraPosition: THREE.Vector3
) {
	if (!disableAnimationsHome) {
		requestAnimationFrame(() =>
			animate(
				disableAnimationsHome,
				leftSpotLightIntensity,
				rightSpotLightIntensity,
				targetLeftIntensity,
				targetRightIntensity,
				OrbitControlsRef,
				desiredTarget,
				PerspectiveCameraRef,
				desiredCameraPosition
			)
		);

		// Interpolation for smooth intensity transition
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
}
