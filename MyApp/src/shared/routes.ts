import { writable } from 'svelte/store';
import Home from '../components/Home.svelte';
import About from '../components/About.svelte';
import SignIn from '../components/SignIn.svelte';
import SignUp from '../components/SignUp.svelte';
import Profile from '../components/Profile.svelte';
import Error404 from '../components/Error404.svelte';
import Forbidden from '../components/Forbidden.svelte';
import { userSession } from './index';
import type { AuthenticateResponse } from './dtos';

export let component = null;
let session:AuthenticateResponse = null;

export const routes = [
	{ path: '/',           label:'Home',       component:Home,      exact:true },
	{ path: '/about',      label:'About',      component:About },
	{ path: '/signin',     label:'Sign In',    component:SignIn,    hide:'auth' },
	{ path: '/signup',     label:'Sign Up',    component:SignUp,    hide:'auth' },
	{ path: '/profile',    label:'Profile',    component:Profile,   show:'auth' },
	{ path: '/forbidden',  label:'Forbidden',  component:Forbidden, hide:true },
	{ component:Error404,  label:'Not Found',  hide:true },
];

export let routeLinks = writable({});

userSession.subscribe(x => {
	session = x;
	const visibleRoutes = routes.filter(x => x.hide !== true);
	routeLinks.set(session
		? visibleRoutes.filter(x => x.hide !== 'auth' || x.show === 'auth')
		: visibleRoutes.filter(x => x.show !== 'auth'));
});

// required to patch in missing pushstate event
(function(history:any) {
    var pushState = history.pushState;
    history.pushState = function(state) {
        const ret = pushState.apply(history, arguments);
        window.dispatchEvent(new CustomEvent('pushstate', {
            detail: { state, location }
		}));
		return ret;
    };
})(window.history);