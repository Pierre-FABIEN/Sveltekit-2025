// utils/mouseUtils.ts

import * as THREE from 'three';

export function handleMouseMove(
	event: MouseEvent,
	mousePercentage: number,
	isMouseOutside: boolean,
	updateDesiredPositions: () => void,
	updateLightIntensityTargets: () => void,
	disableAnimationsHome: boolean
) {
	if (disableAnimationsHome) return;

	const mouseX = event.clientX;
	const windowWidth = window.innerWidth;

	mousePercentage = mouseX / windowWidth;
	isMouseOutside = false;

	updateDesiredPositions();
	updateLightIntensityTargets();
}

export function handleMouseOut(
	event: MouseEvent,
	isMouseOutside: boolean,
	updateDesiredPositions: () => void,
	updateLightIntensityTargets: () => void,
	disableAnimationsHome: boolean
) {
	if (!event.relatedTarget || disableAnimationsHome) {
		isMouseOutside = true;
		updateDesiredPositions();
		updateLightIntensityTargets();
	}
}

export function handleMouseEnter(
	isMouseOutside: boolean,
	updateDesiredPositions: () => void,
	updateLightIntensityTargets: () => void,
	disableAnimationsHome: boolean
) {
	if (!disableAnimationsHome) {
		isMouseOutside = false;
		updateDesiredPositions();
		updateLightIntensityTargets();
	}
}
