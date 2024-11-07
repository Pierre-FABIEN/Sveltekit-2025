<script lang="ts">
	import { navigationStore } from '$store/navigationStore';
	import { enter, exit } from './TransitionPage';
</script>

<div
	class="directors mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8"
	in:enter={{ fromPath: $navigationStore.from?.routeId }}
	out:exit={{ toPath: $navigationStore.to?.routeId }}
>
	Transition Demo
</div>

<style>
	.directors {
		padding-top: 20vh;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
