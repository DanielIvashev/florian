const Dashboard = () => import('../pages/Dashboard.vue');
const SpecialCoin = () => import('../pages/SpecialCoin.vue');
const BullbearSignal = () => import('../pages/BullbearSignal.vue');
const NotFound = () => import('../pages/NotFound.vue');
const Login = () => import('../pages/Login.vue');
const SignUp = () => import('../pages/SignUp.vue');

import auth from './middlewares/auth';
import guest from './middlewares/guest';

// always add NAME for route!
export const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          layout: 'guests-layout',
          middleware: [guest],
        },
    },
    {
        path: '/signUp',
        name: 'SignUp',
        component: SignUp,
        meta: {
            layout: 'guests-layout'
        },
    },
    {
        path: '/dashboard',
        alias: [''],
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          middleware: [auth]
        }
    },
    {
        path: '/dashboard/special-coin/:id',
        name: 'SpecialCoin',
        component: SpecialCoin,
        meta: {
            middleware: [auth]
        }
    },
    {
        path: '/dashboard/bullbear-signal',
        name: 'BullbearSignal',
        component: BullbearSignal,
        meta: {
            middleware: [auth]
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
        meta: {
            layout: 'guests-layout',
        },
    },
];
