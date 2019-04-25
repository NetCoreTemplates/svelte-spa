<svelte:window on:pushstate={x => pathname = x.target.location.pathname} on:popstate={x => pathname = x.target.location.pathname}/>

<script>
import Error404 from './components/Error404.svelte';
import { routes, component, uri } from './shared/routes';
import { checkAuth } from './shared';

let pathname = location.pathname;

checkAuth();
</script>

<nav class="navbar navbar-expand-lg navbar-dark">
	<div class="container">
		<a class="navbar-brand" href="/">
			MyApp
		</a>
		<div class="collapse navbar-collapse" id="navbarResponsive">
			<ul class="navbar-nav mr-auto">
			{#each routes as {path, label, exact} (label) }
				<li class:active={exact ? pathname == path : pathname.startsWith(path)}>
					<a class="nav-link" href="{path}">{label}</a>
				</li>
			{/each}
			</ul>
		</div>
	</div>
</nav>
<div class="container">
	<div class="row p-4">
		<div id="content">
			{#if component}
				<svelte:component this={component}/>
			{:else}
				<Error404 {uri} />
			{/if}
		</div>
	</div>
</div>

<h4 style="position:absolute; bottom: 20px; width: 100%; text-align: center">
	<a href="https://github.com/NetCoreTemplates/svelte-spa">Learn about this Svelte Project Template</a>
</h4>
