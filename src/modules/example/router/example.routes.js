export default [
    {
        path: 'example',
        name: 'example-list',
        component: () => import('../views/ExampleListView.vue'),
        meta: {
            moduleKey: 'example'
        }
    }
]
