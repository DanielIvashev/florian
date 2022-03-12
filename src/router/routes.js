const Dashboard = () => import('../pages/Dashboard.vue');
const SpecialCoin = () => import('../pages/SpecialCoin.vue');
const NotFound = () => import('../pages/NotFound.vue');

// always add NAME for route!
export const routes = [
    {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
      path: '/special-coin/:id',
      name: 'SpecialCoin',
      component: SpecialCoin,
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
