import { createRouter, createWebHistory } from 'vue-router';
import { getAllModuleRoutes } from '@/config/modules.config';
import { setupRouterGuards } from './guards';

import AuthLayout from '@/layouts/AuthLayout.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/auth',
            component: AuthLayout,
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('@/views/auth/LoginView.vue'),
                    meta: { guestOnly: true }
                }
            ]
        },
        {
            path: '/',
            component: DashboardLayout,
            meta: { requiresAuth: true, requiresTenant: true },
            children: [
                {
                    path: '',
                    redirect: { name: 'example-list' }
                },
                ...getAllModuleRoutes()
            ]
        },
        {
            path: '/403',
            name: 'forbidden',
            component: () => import('@/views/errors/ForbiddenView.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/views/errors/NotFoundView.vue')
        }
    ]
});

setupRouterGuards(router);

export default router;
