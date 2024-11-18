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

	let cameraAnimation: any;

	// Objets intermédiaires pour l'animation
	let cameraPos = { x: -25, y: 7, z: 0 };
	let cameraTgt = { x: 0, y: 2, z: 0 };

	function initializeScrollTrigger() {
		// ScrollTrigger pour désactiver les animations liées à la souris
		ScrollTrigger.create({
			trigger: '.about',
			start: 'top center',
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
			start: 'top center',
			end: 'bottom center',
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
				gsap.killTweensOf(cameraPos);
				gsap.killTweensOf(cameraTgt);

				// Utiliser gsap pour animer la caméra
				gsap.to(cameraPos, {
					duration: 0.5,
					x: newCameraPosition.x,
					y: newCameraPosition.y,
					z: newCameraPosition.z,
					ease: 'power2.out',
					onUpdate: () => {
						cameraPosition.set(new THREE.Vector3(cameraPos.x, cameraPos.y, cameraPos.z));
					}
				});

				gsap.to(cameraTgt, {
					duration: 0.5,
					x: newCameraTarget.x,
					y: newCameraTarget.y,
					z: newCameraTarget.z,
					ease: 'power2.out',
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
