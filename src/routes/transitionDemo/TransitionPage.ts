import gsap from 'gsap';
import type Scrollbar from 'smooth-scrollbar';
import { get } from 'svelte/store';
import SmoothScrollBarStore from '$lib/store/SmoothScrollBarStore';

let smoothScroll: Scrollbar | null = null;

// Fonction pour initialiser le smoothScroll et récupérer la dernière instance
const initSmoothScroll = () => {
	smoothScroll = get(SmoothScrollBarStore).smoothScroll;
};

// Fonction utilitaire pour remettre le scroll en haut
const resetScroll = () => {
	if (smoothScroll) {
		smoothScroll.scrollTo(0, 0, 500); // Ici, 500ms est la durée du scroll
	} else {
		window.scrollTo({ top: 0, behavior: 'smooth' }); // Utilisation du scroll par défaut si smoothScroll n'est pas actif
	}
};

export const enter = (node: HTMLElement, { fromPath }: { fromPath: string | null | undefined }) => {
	// Vérifier la valeur de fromPath
	//console.log('enter transition - fromPath:', fromPath);

	const timeline = gsap.timeline();

	if (fromPath === '/transitionDemo/transition') {
		// Animation spécifique si on vient de '/transitionDemo/transition'
		timeline.from(node, {
			x: '-100%',
			ease: 'power2.out'
		});
	} else {
		// Animation par défaut
		timeline.from(node, {
			y: '100%',
			ease: 'power2.out'
		});
	}

	return {
		duration: timeline.duration() * 1000
	};
};

export const exit = (node: HTMLElement, { toPath }: { toPath: string | null | undefined }) => {
	// Vérifier la valeur de toPath
	initSmoothScroll();
	resetScroll();

	const timeline = gsap.timeline();

	if (toPath === '/transitionDemo/transition') {
		// Animation spécifique si on va vers '/transitionDemo/transition'
		timeline.to(node, {
			x: '-100%',
			ease: 'power2.in'
		});
	} else {
		// Animation par défaut
		timeline.to(node, {
			y: '-100%',
			ease: 'power2.in'
		});
	}

	return {
		duration: timeline.duration() * 1000
	};
};
