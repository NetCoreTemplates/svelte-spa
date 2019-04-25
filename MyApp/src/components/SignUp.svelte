<script>
import Input from '../shared/Input.svelte';
import CheckBox from '../shared/CheckBox.svelte';
import ErrorSummary from '../shared/ErrorSummary.svelte';
import { signin, signout, client, Register, redirect, checkAuth, splitOnFirst, toPascalCase } from '../shared';
import classNames from "classnames";

let loading = false;
let responseStatus = null;

let displayName = '';
let email = '';
let password = '';
let confirmPassword = '';
let autoLogin = true;
$: cls = classNames({error:responseStatus, loading});

const newUser = (newEmail) => {
	const names = newEmail.split('@');
	displayName = toPascalCase(names[0]) + " " + toPascalCase(splitOnFirst(names[1],'.')[0]);
	email = newEmail;
	password = confirmPassword = 'p@55wOrd';
}

const submit = async () => {
	try {
        loading = true;
		responseStatus = null;

		const response = await client.post(new Register({
			displayName,
			email,
			password,
			confirmPassword,
			autoLogin,
		}));
		
		await checkAuth();
        loading = false;
        redirect('/');
        
    } catch (e) {
        responseStatus = e.responseStatus || e;
        loading = false;
    }
};

</script>

<div>
	<h3>Register New User</h3>
	<form ref="form" on:submit|preventDefault={submit} class={cls}>
		<div class="form-group">
			<ErrorSummary except="displayName,email,password,confirmPassword" responseStatus={responseStatus} />
		</div>    
		<div class="form-group">
			<Input name="displayName" bind:value={displayName} placeholder="Display Name" responseStatus={responseStatus} />
		</div>
		<div class="form-group">
			<Input name="email" bind:value={email} placeholder="Email" responseStatus={responseStatus} />
		</div>
		<div class="form-group">
			<Input type="password" name="password" bind:value={password} placeholder="Password" responseStatus={responseStatus} />
		</div>
		<div class="form-group">
			<Input type="password" name="confirmPassword" bind:value={confirmPassword} placeholder="Password" responseStatus={responseStatus} />
		</div>
		<div class="form-group">
			<CheckBox name="autoLogin" bind:checked={autoLogin} responseStatus={responseStatus}>
				Auto Login
			</CheckBox>
		</div>
		<div class="form-group">
			<button class="btn btn-lg btn-primary" type="submit">Register</button>
		</div>
		<div class="pt-3">
			<b>Quick Populate:</b>
			<p class="pt-1">
				<button class="btn btn-outline-info btn-sm" on:click|preventDefault={e => newUser('new@@user.com')}>new@user.com</button>
			</p>
		</div>
	</form>
</div>
