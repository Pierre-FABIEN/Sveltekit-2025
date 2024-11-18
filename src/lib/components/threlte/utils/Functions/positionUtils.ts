// utils/positionUtils.ts

import * as THREE from 'three';

export function updateDesiredPositions(
	isMouseOutside: boolean,
	mousePercentage: number,
	desiredTarget: THREE.Vector3,
	desiredCameraPosition: THREE.Vector3,
	disableAnimationsHome: boolean
) {
	if (disableAnimationsHome) return;

	if (isMouseOutside) {
		desiredTarget.set(0, 2, 0);
		desiredCameraPosition.set(-25, 7, 0);
	} else {
		const targetZ = THREE.MathUtils.lerp(-5, 5, mousePercentage);
		desiredTarget.set(0, 2, targetZ);

		const cameraX = THREE.MathUtils.lerp(-25, -25, 1 - mousePercentage);
		const cameraZ = THREE.MathUtils.lerp(-6, 6, 1 - mousePercentage);
		desiredCameraPosition.set(cameraX, 7, cameraZ);
	}
}

export function updateLightIntensityTargets(
	isMouseOutside: boolean,
	mousePercentage: number,
	targetLeftIntensity: number,
	targetRightIntensity: number,
	devLettersIntensity: number,
	musicLettersIntensity: number,
	disableAnimationsHome: boolean
) {
	if (disableAnimationsHome) return;

	const centerMargin = 0.2;

	if (isMouseOutside) {
		targetLeftIntensity = 0;
		targetRightIntensity = 0;
		devLettersIntensity = 0;
		musicLettersIntensity = 0;
	} else if (mousePercentage < 0.5 - centerMargin) {
		// Mouse is on the left, illuminate 'DEV'
		targetLeftIntensity = 70;
		targetRightIntensity = 0;
		devLettersIntensity = 1;
		musicLettersIntensity = 0;
	} else if (mousePercentage > 0.5 + centerMargin) {
		// Mouse is on the right, illuminate 'MUSIC'
		targetLeftIntensity = 0;
		targetRightIntensity = 70;
		devLettersIntensity = 0;
		musicLettersIntensity = 1;
	} else {
		// Mouse is at the center
		targetLeftIntensity = 0;
		targetRightIntensity = 0;
		devLettersIntensity = 0;
		musicLettersIntensity = 0;
	}
}
