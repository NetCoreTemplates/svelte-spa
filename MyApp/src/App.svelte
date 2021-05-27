<svelte:window on:pushstate={x => pathname = x.target.location.pathname} on:popstate={x => pathname = x.target.location.pathname}/>

<script lang="ts">
import { Router, Route, link } from 'svelte-routing';
import { routes, routeLinks } from './shared/routes';
import { checkAuth } from './shared';

let pathname = location.pathname;

let links = null;
routeLinks.subscribe(x => links = x);

checkAuth();
</script>

<Router>
<nav class="navbar navbar-expand-lg navbar-dark">
	<div class="container">
		<a class="navbar-brand" href="/">
			<i class="svg-logo svg-lg mr-1"></i>
			My App
		</a>
		<ul class="navbar-nav">
		{#each links as {path, label, exact} (label) }
			<li class="nav-item">
				<a href="{path}" class="nav-link" class:active={exact ? pathname == path : pathname.startsWith(path)} use:link>{label}</a>
			</li>
		{/each}
		</ul>
	</div>
</nav>
<div class="container">
	<div class="row p-4">
		<div id="content">
			{#each routes as {path,component}}
				<Route path="{path}" component="{component}" />
			{/each}
		</div>
	</div>
</div>

<h4 style="position:absolute; bottom: 20px; width: 100%; text-align: center">
	<a href="https://github.com/NetCoreTemplates/svelte-spa">Learn about this Svelte Project Template</a>
</h4>
</Router>