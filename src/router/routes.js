import Dashboard from "@/pages/Dashboard.vue";
const NotFound = () => import('../pages/NotFound.vue');

// always add NAME for route!
export const routes = [
    {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
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
