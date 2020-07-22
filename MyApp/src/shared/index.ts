import { JsonServiceClient } from '@servicestack/client';
import { writable } from 'svelte/store';
import { navigate } from 'svelte-routing';

export var client = new JsonServiceClient('/');

import { Authenticate, AuthenticateResponse } from './dtos';

export let userSession = writable(null);

export const signin = (response:AuthenticateResponse) => userSession.update(_ => response);
export const signout = async (redirect=true) => {
    userSession.update(_ => null);
    await client.post(new Authenticate({ provider: "logout" }));
    if (redirect) navigate('/');
}

export const redirect = (path:string) => {
    navigate(path);
}

export const checkAuth = async () => {    
    try {
        signin(await client.post(new Authenticate()));
    } catch (e) {
        await signout(false);
    }
}
