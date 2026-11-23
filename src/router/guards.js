import { useAuthStore } from '@/stores/auth'
import { useTenantStore } from '@/stores/tenant'

export function setupRouterGuards(router) {
    router.beforeEach((to) => {
        const authStore = useAuthStore()
        const tenantStore = useTenantStore()

        if (to.meta.requiresAuth && !authStore.isAuthenticated) {
            return { name: 'login' }
        }

        if (to.meta.guestOnly && authStore.isAuthenticated && tenantStore.hasTenant) {
            const firstRoute = tenantStore.navigationItems[0]?.routeName || 'example-list'
            return { name: firstRoute }
        }

        if (to.meta.requiresTenant && !tenantStore.hasTenant) {
            authStore.logout()
            return { name: 'login' }
        }

        if (to.meta.moduleKey && !tenantStore.isModuleEnabled(to.meta.moduleKey)) {
            return { name: 'forbidden' }
        }

        return true
    })
}
