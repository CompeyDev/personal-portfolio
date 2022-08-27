<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { DateTime } from 'luxon';
	// Components
	import Branch from '$lib/components/Branch.svelte';
	import Language from '$lib/components/Language.svelte';
	import ProjectItem from '$lib/components/ProjectItem.svelte';
	import Workspace from '$lib/components/Workspace.svelte';
	import { getCodeData, getOtherActivities } from '$lib/rpcUtils';
	import { useLanyard } from 'sk-lanyard';

	const timeZone = 'America/New_York';
	const isTimeZoneSame = Intl.DateTimeFormat().resolvedOptions().timeZone === timeZone;
	let timeZoneToggle = false;

	$: timeFormatter = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZone: timeZoneToggle ? timeZone : undefined
	});
	$: dateFormatter = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		timeZoneName: 'short',
		timeZone: timeZoneToggle ? timeZone : undefined
	});

	let now = new Date();
	setInterval(() => {
		now = new Date();
	}, 100);

	$: date = dateFormatter.format(now);
	$: time = timeFormatter.format(now);

	const data = useLanyard({ method: 'ws', id: '524722785302609941' });
	$: codeData = getCodeData($data);
	$: otherActivities = getOtherActivities($data);
</script>

<svelte:head>
	<title>silly little portfolio</title>
	<meta name="og:title" content="portfolio" />
	<meta name="description" content="a collection of various things" />
	<meta name="og:description" content="a collection of various things" />
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#f9f0f5" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#281c21" />
</svelte:head>

<section
	class="p-8 sm:p-12 lg:p-24 lg:py-16 font-cascadia z-10 flex flex-col sm:flex-row gap-y-10 justify-center grid place-items-center h-screen"
>
	<div class="flex flex-col gap-7">
		<div class="min-h-[3em] lg:min-h-0">
			<h1 class="text-ocean-700 dark:text-ocean-300">
				<span class="dark:text-ocean-blue">compey</span>
				<Workspace workspace={codeData?.workspace} />
				<Branch name={codeData?.branch} />
				<Language lang={codeData?.lang} />
			</h1>
		</div>
		<div>
			<h1 class="text-ocean-900 dark:text-ocean-100">projects</h1>
			<ul class="list-disc list-inside text-ocean-700 dark:text-ocean-blue">
				<ProjectItem
				href="https://datalink.dev"
				name="datalink"
				description="lightweight & futuristic analytics platform"
				/>
				<ProjectItem
					href="https://github.com/flightpkg"
					name="flightpkg"
					description="package manager of the future"
				/>
				<ProjectItem
					href="https://github.com/CompeyDev/bvm"
					name="bvm"
					description="bun version manager"
				/>
				<ProjectItem
					href="https://github.com/CompeyDev/discord-status-action"
					name="discord-status-action"
					description="discord status emoji using GitHub Actions"
				/>

			</ul>
		</div>

		<div>
			<h1 class="text-ocean-900 dark:text-ocean-100">links</h1>
			<ul class="list-disc list-inside text-ocean-700 dark:text-ocean-blue">
				<ProjectItem href="https://twitter.com/DevComp_" name="twitter" />
				<ProjectItem href="https://github.com/CompeyDev" name="github" />
				<ProjectItem href="mailto:hi@devcomp.xyz" name="email" />
			</ul>
		</div>
	<div
		class="text-ocean-900 dark:text-ocean-300 flex flex-col items-start sm:items-end gap-3 sm:gap-7 sm:text-right"
	>
		{#if !isTimeZoneSame}
			<div
				class="flex flex-col items-start sm:items-end hover:underline cursor-pointer"
				on:click={() => (timeZoneToggle = !timeZoneToggle)}
			>
				<span>{date}</span>
				<span>{time}</span>
			</div>
		{:else}
			<div class="flex flex-col items-start sm:items-end">
				<span>{date}</span>
				<span>{time}</span>
			</div>
		{/if}
		{#if $data?.spotify}
			<div class="flex flex-col items-start sm:items-end">
				<span class="text-ocean-900 dark:text-ocean-100">{$data.spotify?.song}</span>
				<span class="text-ocean-800 dark:text-ocean-300">{$data.spotify?.artist}</span>
				<span class="text-ocean-700 dark:text-ocean-400">{$data.spotify?.album}</span>
			</div>
		{/if}
		{#if codeData?.idling}
			<div class="flex flex-col items-start sm:items-end">
				<span class="text-ocean-900 dark:text-ocean-100">vsc</span>
				<span class="text-ocean-700 dark:text-ocean-400">currently idling </span>
			</div>
		{/if}
		{#if codeData && !codeData.idling}
			<div class="flex flex-col items-start sm:items-end">
				<span class="text-ocean-900 dark:text-ocean-100">vsc</span>
				<span class="text-ocean-800 dark:text-ocean-300"
					>{codeData.workspace}{codeData.branch ? `/${codeData.branch}` : ''}</span
				>
				<span class="text-ocean-700 dark:text-ocean-400"
					>currently writing
					<span class="text-ocean-700 dark:text-ocean-200">{codeData.lang}</span>
				</span>
			</div>
		{/if}
		{#if otherActivities}
			{#each otherActivities as activity}
				<div class="flex flex-col items-start sm:items-end">
					<span class="text-ocean-700 dark:text-ocean-400"
						>playing <span class="text-ocean-700 dark:text-ocean-200">{activity.name}</span>
						{#if activity.start}
							for {DateTime.fromJSDate(activity.start)
								.toRelative({
									base: DateTime.fromJSDate(now)
								})
								?.replace(' ago', '')}
						{/if}
					</span>
				</div>
			{/each}
		{/if}
	</div>
</section>
