<svelte:window on:pushstate={x => pathname = x.target.location.pathname} on:popstate={x => pathname = x.target.location.pathname}/>

<script lang="ts">
import { get } from 'svelte/store';
import { Router, Link, Route, link } from "svelte-routing";
import Error404 from './components/Error404.svelte';
import { routes, routeLinks, component } from './shared/routes';
import { checkAuth } from './shared';

export let url = "";
let pathname = location.pathname;

let links = null;
routeLinks.subscribe(x => links = x);

checkAuth();
</script>

<Router url="{url}">
<nav class="navbar navbar-expand-lg navbar-dark">
	<div class="container">
		<a class="navbar-brand" href="/">
			My App
		</a>
		<div class="navbar-collapse">
			<ul class="navbar-nav mr-auto">
			{#each links as {path, label, exact} (label) }
				<li class="nav-item" class:active={exact ? pathname == path : pathname.startsWith(path)}>
					<a href="{path}" class="nav-link" use:link>{label}</a>
				</li>
			{/each}
			</ul>
		</div>
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