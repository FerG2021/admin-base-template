import { defineStore } from 'pinia';
import apiClient from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';

export const useClientsStore = defineStore('clients', {
    state: () => ({
        items: [],
        loading: false
    }),
    actions: {
        async fetchClients(params = {}) {
            this.loading = true;
            try {
                const { data } = await apiClient.get(ENDPOINTS.CLIENTS.LIST, { params });
                this.items = Array.isArray(data) ? data : data.data || [];
            } finally {
                this.loading = false;
            }
        }
    }
});
