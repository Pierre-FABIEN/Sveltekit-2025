// src/lib/store/cameraStore.js
import { writable } from 'svelte/store';
import * as THREE from 'three';

export const cameraPosition = writable(new THREE.Vector3(-25, 7, 0));
export const cameraTarget = writable(new THREE.Vector3(0, 2, 0));
