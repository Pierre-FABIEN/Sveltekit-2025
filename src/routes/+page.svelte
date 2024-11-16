<script>
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { disableAnimationsHome } from '$lib/store/disableAnimationsStore';

	gsap.registerPlugin(ScrollTrigger);

	const initializeTextAppearAnimations = () => {
		ScrollTrigger.create({
			trigger: '.home',
			start: 'top center',
			end: 'center',
			onEnter: () => {
				console.log('Entré dans .home depuis le haut');
				disableAnimationsHome.set(false);
			},
			onLeave: () => {
				console.log('Quitté .home vers le bas');
				disableAnimationsHome.set(true);
			},
			onEnterBack: () => {
				console.log('Revenu dans .home depuis le bas');
				disableAnimationsHome.set(false);
			},
			onLeaveBack: () => {
				console.log('Quitté .home vers le haut');
				disableAnimationsHome.set(true);
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
