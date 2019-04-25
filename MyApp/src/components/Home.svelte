<script>
import Input from '../shared/Input.svelte';
import { userSession, signout, client, Hello } from '../shared'

export let result = '';
export let txtName = 'Svelte';

const onNameChanged = async e => {
	let name = e.detail;
	result = name
		? (await client.get(new Hello({ name }) )).result
		: '';
};

onNameChanged({ detail: txtName });
</script>

<style>
</style>

<div class="container">
	<div class="row">
		<div class="form-group">
			<div>/hello API:</div>
			<Input bind:value={txtName} placeholder="Your name" on:input={onNameChanged} />
			<h3 class="result pt-2">{result}</h3>
		</div>
	</div>
	<div class="row">
	{#if $userSession}
		<div>
			<p class="pt-3">Hi {$userSession.displayName}!</p> 
			<button class="btn btn-primary" on:click={signout}>Sign Out</button>
		</div>
	{:else}
		<div>
			<p class="pt-3">You're not authenticated, please Sign In:</p>
			<ul class="nav flex-column">
				<li class="nav-item">
					<a class="nav-link" href="/signin">Sign In</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/signup">Register new User</a>
				</li>
			</ul>
		</div>
	{/if}
	</div>
</div>
