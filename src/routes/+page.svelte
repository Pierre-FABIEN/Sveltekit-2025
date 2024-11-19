<script lang="ts">
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import * as THREE from 'three';
	import {
		disableAnimationsHome,
		cameraPosition,
		cameraTarget,
		pointLightIntensity,
		PrincipalLightIntensity,
		FlameIntensity
	} from '$lib/store/ThreeStore/animationStores';
	import { tick } from 'svelte';

	gsap.registerPlugin(ScrollTrigger);

	// Objets intermédiaires pour l'animation
	let cameraPos = { x: -25, y: 7, z: 0 };
	let cameraTgt = { x: 0, y: 2, z: 0 };
	let pointLight = { value: 0 };

	// Variables pour stocker les ScrollTriggers
	let scrollTrigger1: any;
	let scrollTrigger2: any;
	let scrollTrigger3: any;

	function initializeScrollTrigger() {
		// ScrollTrigger pour désactiver les animations liées à la souris
		scrollTrigger1 = ScrollTrigger.create({
			trigger: '.about',
			start: 'top -+80%',
			onEnter: () => {
				disableAnimationsHome.set(true);
			},
			onLeaveBack: () => {
				disableAnimationsHome.set(false);
			}
		});

		// ScrollTrigger pour animer la caméra et éteindre la lumière principale au milieu de '.about'
		scrollTrigger2 = ScrollTrigger.create({
			trigger: '.about',
			start: 'top -+100%',
			end: 'bottom',
			scrub: true,
			onUpdate: (self) => {
				const progress = self.progress;

				// Calcul des nouvelles positions de la caméra basées sur le défilement
				const newCameraPosition = {
					x: THREE.MathUtils.lerp(-25, -50, progress),
					y: THREE.MathUtils.lerp(7, 2, progress),
					z: 0
				};

				const newCameraTarget = {
					x: 0,
					y: THREE.MathUtils.lerp(2, 2, progress),
					z: 0
				};

				// Calcul de la nouvelle intensité de la lumière principale pour qu'elle atteigne zéro au milieu
				if (progress <= 0.5) {
					const newPrincipalLightIntensity = THREE.MathUtils.lerp(70, 0, progress * 2);
					PrincipalLightIntensity.set(newPrincipalLightIntensity);
				} else {
					PrincipalLightIntensity.set(0);
				}

				// Annuler toute animation en cours
				gsap.killTweensOf(cameraPos);
				gsap.killTweensOf(cameraTgt);

				// Utiliser gsap pour animer la caméra
				gsap.to(cameraPos, {
					duration: 0.1,
					x: newCameraPosition.x,
					y: newCameraPosition.y,
					z: newCameraPosition.z,
					ease: 'linear',
					onUpdate: () => {
						cameraPosition.set(new THREE.Vector3(cameraPos.x, cameraPos.y, cameraPos.z));
					}
				});

				gsap.to(cameraTgt, {
					duration: 0.1,
					x: newCameraTarget.x,
					y: newCameraTarget.y,
					z: newCameraTarget.z,
					ease: 'linear',
					onUpdate: () => {
						cameraTarget.set(new THREE.Vector3(cameraTgt.x, cameraTgt.y, cameraTgt.z));
					}
				});
			}
		});

		// ScrollTrigger pour animer la PointLight
		scrollTrigger3 = ScrollTrigger.create({
			trigger: '.suite',

			start: 'top =+50%',
			end: 'bottom',
			scrub: true,
			onEnter: () => {
				console.log('Entré dans .suite');
				// Allumer la lumière progressivement
				gsap.to(pointLight, {
					duration: 1,
					value: 10,
					ease: 'power2.out',
					onUpdate: () => {
						pointLightIntensity.set(pointLight.value);
					}
				});

				gsap.to(pointLight, {
					duration: 1,
					value: 10,
					ease: 'power2.out',
					onUpdate: () => {
						FlameIntensity.set(pointLight.value);
					}
				});
			},
			onLeaveBack: () => {
				console.log('Sorti de .suite');
				// Éteindre la lumière progressivement
				gsap.to(pointLight, {
					duration: 1,
					value: 0,
					ease: 'power2.out',
					onUpdate: () => {
						pointLightIntensity.set(pointLight.value);
					}
				});

				gsap.to(pointLight, {
					duration: 1,
					value: 1,
					ease: 'power2.out',
					onUpdate: () => {
						FlameIntensity.set(pointLight.value);
					}
				});
			}
		});
	}

	$effect(() => {
		tick().then(() => {
			initializeScrollTrigger();
		});

		return () => {
			if (scrollTrigger1) scrollTrigger1.kill();
			if (scrollTrigger2) scrollTrigger2.kill();
			if (scrollTrigger3) scrollTrigger3.kill();
		};
	});
</script>

<!-- Votre code HTML pour les sections -->
<section class="home flex justify-center content-center items-center">
	<p>TEXTE</p>
</section>
<section class="about flex justify-center content-center items-center">
	<p>TEXTE</p>
</section>
<section class="suite flex justify-center content-center items-center">
	<p>TEXTE</p>
</section>
<section class="ets flex justify-center content-center items-center">
	<p>TEXTE</p>
</section>
<section class="ets flex justify-center content-center items-center">
	<p>TEXTE</p>
</section>

<style>
	section {
		border: red 2px solid;
		width: 100%;
		height: 100vh;
		pointer-events: none;
	}
</style>
