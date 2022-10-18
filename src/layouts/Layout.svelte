<script lang="ts">
	import { onMount } from 'svelte';

	import '../global.css';
	onMount(() => {
		onblur = () => {
			document.body.className =
				'bg-[#1f1f1f] dark:bg-[#525252] motion-safe:transition-colors motion-safe:duration-300';
		};
		onfocus = () => {
			document.body.className =
				'bg-[#525252] dark:bg-[#1f1f1f] motion-safe:transition-colors motion-safe:duration-300';
		};
	});
</script>

<main>
	<slot />
</main>

<footer />