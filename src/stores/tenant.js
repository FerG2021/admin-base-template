import { defineStore } from 'pinia'
import { getAccountConfigurations } from '@/config/accounts'

const initialAccountKey = localStorage.getItem('account_key') || null
const initialBundle = initialAccountKey ? getAccountConfigurations(initialAccountKey) : null

export const useTenantStore = defineStore('tenant', {
    state: () => ({
        accountKey: initialBundle ? initialBundle.accountKey : null,
        currentTenant: initialBundle ? initialBundle.clientConfig.tenant : null,
        modulesConfig: initialBundle
            ? initialBundle.modulesConfig
            : { enabledModules: [], navigation: [] },
        clientConfig: initialBundle ? initialBundle.clientConfig : { modules: {} }
    }),
    getters: {
        hasTenant: (state) => !!state.currentTenant?.id,
        enabledModules: (state) => state.modulesConfig?.enabledModules || [],
        navigationItems: (state) => state.modulesConfig?.navigation || [],
        primaryColor: (state) => state.currentTenant?.primaryColor || '#0d2f54'
    },
    actions: {
        loadAccountConfig(accountKey) {
            const bundle = getAccountConfigurations(accountKey)
            this.accountKey = bundle.accountKey
            this.currentTenant = bundle.clientConfig.tenant
            this.modulesConfig = bundle.modulesConfig
            this.clientConfig = bundle.clientConfig

            localStorage.setItem('account_key', bundle.accountKey)
            this.applyTenantTheme()
        },
        getModuleConfig(moduleKey) {
            return this.clientConfig?.modules?.[moduleKey] || {}
        },
        isModuleEnabled(moduleKey) {
            if (!moduleKey) return true
            return this.enabledModules.includes(moduleKey)
        },
        clearTenant() {
            this.accountKey = null
            this.currentTenant = null
            this.modulesConfig = { enabledModules: [], navigation: [] }
            this.clientConfig = { modules: {} }
            localStorage.removeItem('account_key')
        },
        applyTenantTheme() {
            document.documentElement.style.setProperty('--tenant-primary', this.primaryColor)
        }
    }
})
