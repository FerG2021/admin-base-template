<script>
import { mapActions, mapState } from 'pinia';
import Button from 'primevue/button';
import { useAuthStore } from '@/stores/auth';
import { useTenantStore } from '@/stores/tenant';
import { useUiStore } from '@/stores/ui';
import { NAVIGATION_ITEMS } from '@/config/navigation.config';

export default {
    name: 'DashboardLayout',
    components: {
        PrimeButton: Button
    },
    computed: {
        ...mapState(useUiStore, ['sidebarCollapsed']),
        ...mapState(useTenantStore, ['currentTenant', 'navigationItems']),
        tenantName() {
            return this.currentTenant?.name || 'Panel SaaS';
        },
        visibleNavItems() {
            const tenantStore = useTenantStore();

            return NAVIGATION_ITEMS.filter((item) => tenantStore.isModuleEnabled(item.moduleKey));
        }
    },
    methods: {
        ...mapActions(useUiStore, ['toggleSidebar']),
        ...mapActions(useAuthStore, ['logout']),
        ...mapActions(useTenantStore, ['clearTenant']),
        goToSelectTenant() {
            this.$router.push({ name: 'select-tenant' });
        },
        handleLogout() {
            this.logout();
            this.clearTenant();
            this.$router.push({ name: 'login' });
        }
    }
};
</script>

<template>
    <div class="dashboard-layout">
        <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
            <div class="sidebar-header">
                <span class="brand-title">{{ tenantName }}</span>
            </div>

            <nav class="sidebar-nav">
                <router-link
                    v-for="item in visibleNavItems"
                    :key="item.routeName"
                    :to="{ name: item.routeName }"
                    class="nav-item"
                >
                    <i :class="item.icon" />
                    <span v-if="!sidebarCollapsed">{{ item.label }}</span>
                </router-link>
            </nav>
        </aside>

        <div class="main-wrapper">
            <header class="topbar">
                <PrimeButton
                    icon="pi pi-bars"
                    text
                    rounded
                    aria-label="Alternar menú"
                    @click="toggleSidebar"
                    title="Alternar menú"
                />

                <div class="topbar-actions">
                    <PrimeButton
                        label="Salir"
                        icon="pi pi-sign-out"
                        size="small"
                        severity="secondary"
                        text
                        @click="handleLogout"
                    />
                </div>
            </header>

            <main class="content">
                <router-view />
            </main>
        </div>
    </div>
</template>

<style scoped>
.dashboard-layout {
    display: flex;
    min-height: 100vh;
    background-color: #f8fafc;
}

.sidebar {
    width: 240px;
    background-color: var(--tenant-primary, #0d2f54);
    color: #ffffff;
    transition: width 0.2s ease;
    flex-shrink: 0;
}

.sidebar.collapsed {
    width: 72px;
}

.sidebar-header {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 1.25rem;
    font-weight: 700;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.sidebar-nav {
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    gap: 0.25rem;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.65rem 0.85rem;
    border-radius: 6px;
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
}

.nav-item.router-link-active {
    background-color: rgba(255, 255, 255, 0.16);
    color: #ffffff;
}

.main-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.topbar {
    height: 60px;
    background-color: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    padding: 0 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.topbar-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.content {
    padding: 1.5rem;
    flex: 1;
}
</style>
