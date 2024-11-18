// stores/ThreeStore/animationStores.ts

import { writable } from 'svelte/store';
import * as THREE from 'three';

export const disableAnimationsHome = writable(true);

export const isMouseOutside = writable<boolean>(false);
export const mousePercentage = writable<number>(0);

export const desiredTarget = writable<THREE.Vector3>(new THREE.Vector3(0, 2, 0));
export const desiredCameraPosition = writable<THREE.Vector3>(new THREE.Vector3(-25, 7, 0));

export const leftSpotLightIntensity = writable<number>(0);
export const rightSpotLightIntensity = writable<number>(0);
export const targetLeftIntensity = writable<number>(0);
export const targetRightIntensity = writable<number>(0);

export const devLettersIntensity = writable<number>(0);
export const musicLettersIntensity = writable<number>(0);

export const PrincipalLightIntensity = writable<number>(70);
export const FlameIntensity = writable<number>(1);

export const cameraPosition = writable(new THREE.Vector3(-25, 7, 0));
export const cameraTarget = writable(new THREE.Vector3(0, 2, 0));

export const isControlledByScroll = writable<boolean>(false);
