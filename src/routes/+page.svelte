<script lang="ts">
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import * as THREE from 'three';
	import {
		disableAnimationsHome,
		cameraPosition,
		cameraTarget
	} from '$lib/store/ThreeStore/animationStores';

	gsap.registerPlugin(ScrollTrigger);

	// Objets intermédiaires pour l'animation
	let cameraPos = { x: -25, y: 7, z: 0 };
	let cameraTgt = { x: 0, y: 2, z: 0 };

	function initializeScrollTrigger() {
		// ScrollTrigger pour désactiver les animations liées à la souris
		ScrollTrigger.create({
			trigger: '.about',
			start: 'top -+80%',

			onEnter: () => {
				disableAnimationsHome.set(true);
			},
			onLeaveBack: () => {
				disableAnimationsHome.set(false);
			}
		});

		// ScrollTrigger pour animer la caméra
		ScrollTrigger.create({
			trigger: '.about',
			markers: true,
			start: 'top -+80%',
			end: 'bottom',
			scrub: true,
			onUpdate: (self) => {
				const progress = self.progress;

				// Calcul des nouvelles positions de la caméra basées sur le défilement
				const newCameraPosition = {
					x: THREE.MathUtils.lerp(-25, -50, progress),
					y: THREE.MathUtils.lerp(7, 20, progress),
					z: 0
				};

				const newCameraTarget = {
					x: 0,
					y: THREE.MathUtils.lerp(0, -10, progress),
					z: 0
				};

				//PrincipalLightIntensity.set(0);

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
	}

	$effect(() => {
		setTimeout(() => {
			initializeScrollTrigger();
		}, 10);
	});
</script>

<section class="home flex justify-center content-center items-center">
	<p>TEXTE</p>
</section>
<section class="about flex justify-center content-center items-center">
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
