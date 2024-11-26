import { writable } from 'svelte/store';

const enableLogging: boolean = false;

interface NavigationData {
	routeId: string | null;
}

interface NavigationState {
	from: NavigationData | null;
	to: NavigationData | null;
}

const initialState: NavigationState = {
	from: null,
	to: null
};

function createNavigationStore(enableLogging: boolean) {
	const { subscribe, set, update } = writable<NavigationState>(initialState);

	if (enableLogging) {
		subscribe((value) => {
			console.log('%c[navigationStore] value changed:', 'color: purple;', value);
		});
	}

	return {
		subscribe,
		set(value: NavigationState) {
			if (enableLogging) {
				console.log('%c[navigationStore] set:', 'color: green;', value);
			}
			set(value);
		},
		update(updater: (state: NavigationState) => NavigationState) {
			update((state) => {
				const newState = updater(state);
				if (enableLogging) {
					console.log('%c[navigationStore] update:', 'color: blue;', newState);
				}
				return newState;
			});
		}
	};
}

const navigationStore = createNavigationStore(enableLogging);
export default navigationStore;
