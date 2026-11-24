<template>
    <div class="dashboard-shell">
        <button
            v-if="mobileNavOpen"
            class="sidebar-backdrop"
            type="button"
            aria-label="Cerrar menú de navegación"
            @click="closeMobileNav"
        ></button>

        <aside
            id="dashboard-sidebar"
            :class="['sidebar', { collapsed: sidebarCollapsed, 'mobile-open': mobileNavOpen }]"
        >
            <div class="sidebar-brand">
                <img
                    v-if="tenantLogo"
                    :src="tenantLogo"
                    class="brand-logo"
                    :alt="tenantTitle"
                />
                <span v-else class="brand-badge">{{ tenantBadge }}</span>
                <div v-if="!sidebarCollapsed || mobileNavOpen" class="brand-copy">
                    <span class="brand-name">{{ tenantTitle }}</span>
                    <span v-if="tenantSubtitle" class="brand-subtitle">
                        {{ tenantSubtitle }}
                    </span>
                </div>
            </div>

            <nav class="sidebar-nav">
                <RouterLink
                    v-for="item in sidebarItems"
                    :key="item.moduleKey"
                    :to="{ name: item.routeName }"
                    class="nav-item"
                    active-class="is-active"
                    @click="closeMobileNav"
                >
                    <i :class="item.icon" />
                    <span v-if="!sidebarCollapsed || mobileNavOpen" class="nav-label">
                        {{ item.label }}
                    </span>
                </RouterLink>
            </nav>
        </aside>

        <div class="dashboard-main">
            <header class="topbar">
                <PrimeButton
                    icon="pi pi-bars"
                    severity="secondary"
                    text
                    aria-label="Alternar menú de navegación"
                    aria-controls="dashboard-sidebar"
                    @click="toggleNavigation"
                />
                <div class="topbar-actions">
                    <span v-if="user?.username" class="user-tag">{{ user.username }}</span>
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

            <main class="content-area">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import Button from 'primevue/button';
import { useAuthStore } from '@/stores/auth';
import { useTenantStore } from '@/stores/tenant';
import { useUiStore } from '@/stores/ui';

export default {
    name: 'DashboardLayout',
    components: {
        PrimeButton: Button
    },
    data() {
        return {
            mobileNavOpen: false
        };
    },
    computed: {
        ...mapState(useUiStore, ['sidebarCollapsed']),
        ...mapState(useAuthStore, ['user']),
        ...mapState(useTenantStore, ['currentTenant', 'sidebarItems']),
        tenantName() {
            return this.currentTenant?.name || 'Panel SaaS';
        },
        tenantTitle() {
            return this.currentTenant?.title || this.tenantName;
        },
        tenantSubtitle() {
            return this.currentTenant?.subtitle || '';
        },
        tenantLogo() {
            return this.currentTenant?.logo || '';
        },
        tenantBadge() {
            return this.currentTenant?.logoText || this.tenantName.slice(0, 2).toUpperCase();
        }
    },
    mounted() {
        useTenantStore().applyTenantTheme();
    },
    methods: {
        ...mapActions(useUiStore, ['toggleSidebar']),
        ...mapActions(useAuthStore, ['logout']),
        ...mapActions(useTenantStore, ['clearTenant']),
        toggleNavigation() {
            if (window.matchMedia('(max-width: 767px)').matches) {
                this.mobileNavOpen = !this.mobileNavOpen;
                return;
            }

            this.toggleSidebar();
        },
        closeMobileNav() {
            this.mobileNavOpen = false;
        },
        handleLogout() {
            this.logout();
            this.clearTenant();
            this.$router.push({ name: 'login' });
        }
    }
};
</script>

<style scoped>
.dashboard-shell {
    display: flex;
    min-height: 100vh;
    min-height: 100dvh;
}

.sidebar {
    width: 240px;
    /* background-color: #0f172a; */
    color: #f8fafc;
    display: flex;
    flex-direction: column;
    transition: width 0.2s ease;
    flex-shrink: 0;
    z-index: 20;
    border: 1px solid #e2e8f0;
}

.sidebar.collapsed {
    width: 72px;
}

.sidebar-brand {
    height: 60px;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.brand-logo {
    width: 36px;
    height: 36px;
    object-fit: contain;
    flex-shrink: 0;
}

.brand-copy {
    min-width: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.brand-badge {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background-color: var(--tenant-primary, #77c6a7);
    color: var(--tenant-text, #0f172a);
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.brand-name {
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.brand-subtitle {
    font-size: 0.75rem;
    color: #94a3b8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.sidebar-nav {
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    gap: 0.35rem;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.65rem 0.75rem;
    border-radius: 8px;
    color: #cbd5e1;
    text-decoration: none;
    transition:
        background-color 0.15s ease,
        color 0.15s ease;
}

.nav-item:hover {
    background-color: rgba(255, 255, 255, 0.06);
    color: #ffffff;
}

.nav-item.is-active {
    background-color: var(--tenant-primary, #77c6a7);
    color: var(--tenant-text, #0f172a);
    font-weight: 600;
}

.dashboard-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    background-color: #f8fafc;
}

.topbar {
    height: 60px;
    min-height: 60px;
    padding: 0 1.25rem;
    background-color: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.topbar-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.user-tag {
    font-size: 0.875rem;
    color: #475569;
}

.content-area {
    padding: 1.5rem;
    flex: 1;
    min-width: 0;
    overflow-x: auto;
}

.sidebar-backdrop {
    display: none;
}

@media (max-width: 900px) {
    .sidebar {
        width: 220px;
    }

    .sidebar.collapsed {
        width: 72px;
    }

    .content-area {
        padding: 1.25rem;
    }
}

@media (max-width: 767px) {
    .sidebar,
    .sidebar.collapsed {
        position: fixed;
        inset: 0 auto 0 0;
        width: min(82vw, 280px);
        height: 100vh;
        height: 100dvh;
        transform: translateX(-100%);
        transition: transform 0.2s ease;
        box-shadow: 0 0 24px rgba(15, 23, 42, 0.2);
    }

    .sidebar.mobile-open {
        transform: translateX(0);
    }

    .sidebar-backdrop {
        display: block;
        position: fixed;
        inset: 0;
        z-index: 19;
        border: 0;
        padding: 0;
        background: rgba(15, 23, 42, 0.45);
    }

    .dashboard-main {
        width: 100%;
    }

    .topbar {
        height: 56px;
        min-height: 56px;
        padding: 0 0.75rem;
    }

    .topbar-actions {
        gap: 0.25rem;
    }

    .content-area {
        padding: 1rem 0.75rem;
    }
}

@media (max-width: 420px) {
    .user-tag {
        display: none;
    }

    .content-area {
        padding: 0.75rem 0.5rem;
    }
}
</style>
