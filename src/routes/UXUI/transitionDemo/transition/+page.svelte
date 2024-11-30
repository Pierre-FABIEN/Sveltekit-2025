<script lang="ts">
	import { Button } from '$shadcn/button';
	import navigationStore from './../../../../lib/store/navigationStore';
	import { enter, exit } from './TransitionPage';
</script>

<div
	class="transitionDemo flex justify-center"
	in:enter={{ fromPath: $navigationStore.from?.routeId }}
	out:exit={{ toPath: $navigationStore.to?.routeId }}
>
	<Button href="/UXUI/transitionDemo">Transition</Button>
</div>

<style>
	.transitionDemo {
		display: flex;
		flex-direction: column;
		align-items: center;

		position: absolute;
		top: 0;
		left: 0;
		background-color: blue;
		width: 100vw;
		height: 100vh;
	}
</style>
