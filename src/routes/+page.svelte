<script lang="ts">
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { disableAnimationsHome } from '$lib/store/disableAnimationsStore';
	import * as THREE from 'three';
	import { cameraPosition, cameraTarget } from '$lib/store/cameraStore.ts';

	gsap.registerPlugin(ScrollTrigger);
	let cameraAnimation: any;

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
			onUpdate: (self) => {
				const progress = self.progress;

				// Calcul des nouvelles positions de la caméra basées sur le défilement
				const newCameraPosition = {
					x: THREE.MathUtils.lerp(-25, -35, progress),
					y: THREE.MathUtils.lerp(7, 25, progress),
					z: 0
				};

				const newCameraTarget = {
					x: 0,
					y: THREE.MathUtils.lerp(2, 5, progress),
					z: 0
				};

				// Annuler toute animation en cours
				if (cameraAnimation) cameraAnimation.kill();

				// Utiliser gsap pour animer la caméra
				cameraAnimation = gsap.to(cameraPosition, {
					duration: 0.5,
					x: newCameraPosition.x,
					y: newCameraPosition.y,
					z: newCameraPosition.z,
					ease: 'power2.out',
					onUpdate: () => {
						cameraPosition.set(
							new THREE.Vector3(cameraPosition.x, cameraPosition.y, cameraPosition.z)
						);
					}
				});

				gsap.to(cameraTarget, {
					duration: 0.5,
					x: newCameraTarget.x,
					y: newCameraTarget.y,
					z: newCameraTarget.z,
					ease: 'power2.out',
					onUpdate: () => {
						cameraTarget.set(new THREE.Vector3(cameraTarget.x, cameraTarget.y, cameraTarget.z));
					}
				});
			},
			onLeave: () => {
				console.log('Quitté .about vers le bas');
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
