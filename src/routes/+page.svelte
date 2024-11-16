<script>
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { disableAnimationsHome } from '$lib/store/disableAnimationsStore';
	import * as THREE from 'three';
	import { cameraPosition, cameraTarget } from '$lib/store/cameraStore.ts';

	gsap.registerPlugin(ScrollTrigger);

	const initializeTextAppearAnimations = () => {
		ScrollTrigger.create({
			trigger: '.home',
			start: 'top center',
			end: 'center',
			scrub: true,
			onEnter: () => {
				console.log('Entré dans .home depuis le haut');
				disableAnimationsHome.set(false);
			},
			onLeave: () => {
				console.log('Quitté .home vers le bas');
				disableAnimationsHome.set(true);
				console.log('sortie');
			},
			onEnterBack: () => {
				console.log('Revenu dans .home depuis le bas');
				disableAnimationsHome.set(false);
			}
		});

		ScrollTrigger.create({
			trigger: '.about',
			start: 'top center +-50%',
			end: 'center',
			scrub: true,
			onEnter: (self) => {
				const progress = self.progress;

				// Calcul des nouvelles positions de la caméra basées sur le défilement
				const newCameraPosition = new THREE.Vector3(
					THREE.MathUtils.lerp(-25, -60, progress), // Interpoler entre -25 et -60
					THREE.MathUtils.lerp(7, 70, progress), // Interpoler entre 7 et 70
					0
				);

				const newCameraTarget = new THREE.Vector3(
					0,
					THREE.MathUtils.lerp(2, 5, progress), // Interpoler entre 2 et 5
					0
				);

				// Mettre à jour les stores avec les nouvelles valeurs
				cameraPosition.set(newCameraPosition);
				cameraTarget.set(newCameraTarget);
			},
			onLeave: () => {
				console.log('Quitté .about vers le bas');

				console.log('sortie');
			},
			onEnterBack: () => {
				console.log('Revenu dans .about depuis le bas');
			}
		});
	};

	$effect(() => {
		setTimeout(() => {
			initializeTextAppearAnimations();
		}, 10);
	});
</script>

<section class="home"></section>
<section class="about"></section>
<section class="ets"></section>

<style>
	section {
		border: red 2px solid;
		width: 100%;
		height: 100vh;
	}
</style>
