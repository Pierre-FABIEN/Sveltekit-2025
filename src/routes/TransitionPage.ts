// Importation des librairies nécessaires
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
	// Initialisation du scroll pour la transition d'entrée
	initSmoothScroll();
	resetScroll();

	const timeline = gsap.timeline();

	if (fromPath === '/transitionDemo') {
		// Animation spécifique si on vient de '/transitionDemo'
		timeline.from(node, {
			opacity: 0,
			x: '-100%',
			ease: 'power2.out'
		});
	} else {
		// Animation par défaut
		timeline.from(node, {
			opacity: 0,
			y: '100%',
			ease: 'power2.out'
		});
	}

	return {
		duration: timeline.duration() * 1000
	};
};

export const exit = (node: HTMLElement, { toPath }: { toPath: string | null | undefined }) => {
	// Initialisation et remise à zéro du scroll pour la transition de sortie
	initSmoothScroll();
	resetScroll();

	const timeline = gsap.timeline();

	if (toPath === '/transitionDemo') {
		// Animation spécifique si on va vers '/transitionDemo'
		timeline.to(node, {
			opacity: 0,
			x: '100%',
			ease: 'power2.in'
		});
	} else {
		// Animation par défaut
		timeline.to(node, {
			opacity: 0,
			y: '-100%',
			ease: 'power2.in'
		});
	}

	return {
		duration: timeline.duration() * 1000
	};
};
