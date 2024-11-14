// src/lib/store/layoutState.ts

import { writable } from 'svelte/store';
import { navigationStore } from '$store/navigationStore';
import { onNavigate } from '$app/navigation';

export const isClient = writable(false);
export const loading = writable(true);
export const progressValue = writable(0);
export const previousRouteId = writable(null);

export function initializeLayoutState(currentPage) {
	const currentData = {
		routeId: currentPage.route.id
	};

	navigationStore.set({
		from: null,
		to: currentData
	});

	isClient.set(true);
	let currentProgress = 0;
	const timer = setInterval(() => {
		if (currentProgress < 100) {
			currentProgress += 10;
			progressValue.set(currentProgress);
		} else {
			clearInterval(timer);
			loading.set(false);
		}
	}, 10);
}

export function setupNavigationEffect() {
	onNavigate((navigation) => {
		const fromData = navigation.from ? { routeId: navigation.from.route.id } : null;
		const toData = navigation.to ? { routeId: navigation.to.route.id } : null;

		if (fromData && toData && fromData.routeId !== toData.routeId) {
			navigationStore.set({
				from: fromData,
				to: toData
			});
			previousRouteId.set(toData.routeId);
		}
	});
}
