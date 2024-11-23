import TransitionIcon from 'lucide-svelte/icons/arrow-left-right';
import DirectorsIcon from 'lucide-svelte/icons/users';
import AgenciesIcon from 'lucide-svelte/icons/building';
import ProductsIcon from 'lucide-svelte/icons/package';
import SnippetIcon from 'lucide-svelte/icons/code';
import StateIcon from 'lucide-svelte/icons/database';
import { ChartBarIcon, KeyIcon } from 'lucide-svelte';

export const crudItems = [
	{
		title: 'Directors',
		url: '/crud/directors',
		icon: DirectorsIcon
	},
	{
		title: 'Agencies',
		url: '/crud/agencies',
		icon: AgenciesIcon
	},
	{
		title: 'Products',
		url: '/crud/products',
		icon: ProductsIcon
	},
	{
		title: 'Statistical',
		url: '/crud/stats',
		icon: ChartBarIcon
	}
];

export const stateItems = [
	{
		title: 'Snippet svelte',
		url: '/stateManager/snippet',
		icon: SnippetIcon
	},
	{
		title: 'State svelte',
		url: '/stateManager/state',
		icon: StateIcon
	}
];
export const socketItems = [
	{
		title: 'Chat Session',
		url: '/websocket/chat',
		icon: StateIcon
	}
];
export const UIUXItems = [
	{
		title: 'Transition Demo',
		url: '/UXUI/transitionDemo',
		icon: TransitionIcon
	},
	{
		title: 'Carousel',
		url: '/UXUI/carousel',
		icon: TransitionIcon
	},
	{
		title: 'SiteMap',
		url: '/UXUI/sitemap.xml',
		icon: TransitionIcon
	},
	{
		title: 'Threlte',
		url: '/UXUI/threlte',
		icon: TransitionIcon
	}
];

export const AuthItems = [
	{
		title: 'Login',
		url: '/auth/login',
		icon: KeyIcon
	},
	{
		title: 'Register',
		url: '/auth/signup',
		icon: KeyIcon
	},
	{
		title: 'Forgot Password',
		url: '/auth/forgot-password',
		icon: KeyIcon
	},
	{
		title: 'Dashboard',
		url: '/auth',
		icon: KeyIcon
	},
	{
		title: 'Settings',
		url: '/auth/settings',
		icon: KeyIcon
	}
];
