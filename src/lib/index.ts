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
		url: '/directors',
		icon: DirectorsIcon
	},
	{
		title: 'Agencies',
		url: '/agencies',
		icon: AgenciesIcon
	},
	{
		title: 'Products',
		url: '/products',
		icon: ProductsIcon
	},
	{
		title: 'Statistical',
		url: '/stats',
		icon: ChartBarIcon
	}
];

export const stateItems = [
	{
		title: 'Snippet',
		url: '/snippet',
		icon: SnippetIcon
	},
	{
		title: 'State',
		url: '/state',
		icon: StateIcon
	}
];

export const UIUXItems = [
	{
		title: 'Transition Demo',
		url: '/transitionDemo',
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
