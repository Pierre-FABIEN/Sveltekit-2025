// src/lib/utils/Functions/mouseHandlers.ts

import { get } from 'svelte/store';

// Import des stores nécessaires
import {
	disableAnimationsHome,
	isMouseOutside,
	mousePercentage
} from '$lib/store/ThreeStore/animationStores';

// Import des fonctions nécessaires avec le bon chemin
import { updateDesiredPositions, updateLightIntensityTargets } from './positionUtils'; // Ajustez le chemin selon votre structure de dossiers

// Fonctions de gestion de la souris (comme précédemment)
export function handleMouseMove(event: MouseEvent): void {
	if (get(disableAnimationsHome)) return;

	const mouseX = event.clientX;
	const windowWidth = window.innerWidth;

	mousePercentage.set(mouseX / windowWidth);
	isMouseOutside.set(false);

	updateDesiredPositions();
	updateLightIntensityTargets();
}

export function handleMouseOut(event: MouseEvent): void {
	if (!event.relatedTarget || get(disableAnimationsHome)) {
		isMouseOutside.set(true);
		updateDesiredPositions();
		updateLightIntensityTargets();
	}
}

export function handleMouseEnter(): void {
	if (!get(disableAnimationsHome)) {
		isMouseOutside.set(false);
		updateDesiredPositions();
		updateLightIntensityTargets();
	}
}
