import { JsonServiceClient, queryString } from '@servicestack/client';
import { writable } from 'svelte/store';

export var client = new JsonServiceClient('/');

export {
    errorResponse, errorResponseExcept, splitOnFirst, toPascalCase, queryString
} from '@servicestack/client';

export {
    ResponseStatus, ResponseError,
    Authenticate, AuthenticateResponse,
    Register,
    Hello, HelloResponse,
} from './dtos';

import {
    ResponseStatus, ResponseError,
    Authenticate, AuthenticateResponse,
} from './dtos';


export let userSession = writable(null);

export const signin = (response) => userSession.update(_ => response);
export const signout = async () => {
    userSession.update(_ => null);
    await client.post(new Authenticate({ provider: "logout" }));
}

export const redirect = (path) => {
    const externalUrl = path.indexOf('://') >= 0;
    if (!externalUrl) {
        history.pushState(null, null, path);
    } else {
        location.href = path;
    }
}

export const checkAuth = async () => {    
    try {
        signin(await client.post(new Authenticate()));
    } catch (e) {
        await signout();
    }
}
