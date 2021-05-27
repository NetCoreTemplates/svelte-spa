<script lang="ts">
import Input from '../shared/Input.svelte';
import { userSession, signout, client } from '../shared';
import { Hello } from '../shared/dtos';

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

  <div class="row justify-content-between">
    <div class="col col-1">
      <i class="svg-logo svg-9x"></i>
    </div>
    <div class="col col-4 mt-4">
		<div class="ms-4">
			<Input bind:value={txtName} placeholder="Your name" on:input={onNameChanged} />
			<h3 class="result pt-2">{result}</h3>
		</div>
    </div>
	<div class="col-md-auto"></div>
	<div class="col col-4">
	{#if $userSession}
		<div class="text-right">
			<p class="pt-3">Hi {$userSession.displayName}!</p> 
			<button class="btn btn-primary" on:click={signout}>Sign Out</button>
		</div>
	{:else}
		<div class="text-right">
			<p class="pt-3">You're not authenticated.</p>
			<a href="/signin" class="btn btn-primary btn-sm">Sign In</a>
			<a href="/signup" class="ms-2 btn btn-outline-secondary btn-sm">Register New User</a>
		</div>
	{/if}
	</div>
  </div>

<div class="container"></div>
