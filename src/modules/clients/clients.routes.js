export default [
    {
        path: 'clients',
        name: 'clients-list',
        component: () => import('./views/Clients.vue'),
        meta: {
            moduleKey: 'clients'
        }
    }
];
