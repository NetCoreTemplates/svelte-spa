import Home from '../components/Home.svelte';
import About from '../components/About.svelte';
import SignIn from '../components/SignIn.svelte';
import SignUp from '../components/SignUp.svelte';
import navaid from 'navaid';

export let component = null;
export let uri = null;

export const routes = [
	{ path: '/',       label:'Home',    component:Home, exact:true },
	{ path: '/about',  label:'About',   component:About },
	{ path: '/signin', label:'Sign In', component:SignIn },
	{ path: '/signup', label:'Sign Up', component:SignUp },
];

const render = (Component) => () => component = Component;
const on404  = (u) => { 
	if (u.indexOf('/http') === 0) {
		location.replace(u.substring(1))
		return;
	}

	component = null; 
	uri = u; 
};

export const router = navaid('/', on404);
for (let route of routes) {
	router.on(route.path, render(route.component));
}
router.listen();
