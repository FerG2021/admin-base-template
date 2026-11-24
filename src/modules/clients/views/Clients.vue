<script>
import { mapActions, mapState } from 'pinia';
import { useTenantStore } from '@/stores/tenant';
import { useClientsStore } from '../clientsStores';
import DataTable from '@/components/DataTable.vue';

export default {
    name: 'ClientsView',
    components: {
        DataTable
    },
    computed: {
        ...mapState(useClientsStore, ['items', 'loading']),
        ...mapState(useTenantStore, ['getModuleConfig']),
        moduleConfig() {
            return this.getModuleConfig('clients');
        },
        headerProps() {
            return this.moduleConfig.tableProps || {};
        }
    },
    mounted() {
        this.fetchClients();
    },
    methods: {
        ...mapActions(useClientsStore, ['fetchClients'])
    }
};
</script>

<template>
    <DataTable
        :title="moduleConfig.title"
        :subtitle="moduleConfig.subtitle"
        :items="items"
        :loading="loading"
        :headerProps="headerProps"
    />
</template>
