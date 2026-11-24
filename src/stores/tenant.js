import { defineStore } from 'pinia';
import { getAccountDefinition } from '@/config/accounts/accounts';
import { getAvailableModules, getResolvedModuleConfig, isModuleEnabled } from '@/modules/modules';

const savedAccountKey = localStorage.getItem('account_key');

function buildAccountState(accountKey) {
    if (!accountKey) {
        return {
            accountKey: null,
            currentTenant: null
        };
    }

    try {
        const definition = getAccountDefinition(accountKey);
        return {
            accountKey: definition.accountKey,
            currentTenant: definition.tenant || null
        };
    } catch {
        return {
            accountKey: null,
            currentTenant: null
        };
    }
}

export const useTenantStore = defineStore('tenant', {
    state: () => buildAccountState(savedAccountKey),
    getters: {
        hasTenant: (state) => !!state.accountKey && !!state.currentTenant,
        primaryColor: (state) => state.currentTenant?.primaryColor || '#0F172A',
        textColor: (state) => state.currentTenant?.textColor || '#FFFFFF',
        sidebarItems: (state) =>
            getAvailableModules(state.accountKey)
                .filter((module) => module.enabled && module.showInSidebar !== false)
                .filter((module) => module.routeName)
                .map((module) => ({ ...module, moduleKey: module.key })),
        defaultRouteName() {
            return this.sidebarItems[0]?.routeName || 'forbidden';
        }
    },
    actions: {
        loadAccountConfig(accountKey) {
            const definition = getAccountDefinition(accountKey);
            this.accountKey = definition.accountKey;
            this.currentTenant = definition.tenant || null;

            localStorage.setItem('account_key', this.accountKey);
            this.applyTenantTheme();
        },
        isModuleEnabled(moduleKey) {
            if (!moduleKey) {
                return true;
            }
            return isModuleEnabled(moduleKey, this.accountKey);
        },
        getModuleConfig(moduleKey) {
            return getResolvedModuleConfig(moduleKey, this.accountKey);
        },
        clearTenant() {
            this.accountKey = null;
            this.currentTenant = null;
            localStorage.removeItem('account_key');
        },
        applyTenantTheme() {
            document.documentElement.style.setProperty('--tenant-primary', this.primaryColor);
            document.documentElement.style.setProperty('--tenant-text', this.textColor);
        }
    }
});
