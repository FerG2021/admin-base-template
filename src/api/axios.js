import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useTenantStore } from '@/stores/tenant';
import router from '@/router/router';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

apiClient.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    const tenantStore = useTenantStore();

    if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
    }

    if (tenantStore.currentTenant?.id) {
        config.headers['X-Tenant-ID'] = tenantStore.currentTenant.id;
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            const authStore = useAuthStore();
            authStore.logout();
            router.push({ name: 'login' });
        } else if (status === 403) {
            router.push({ name: 'forbidden' });
        }

        return Promise.reject(error);
    }
);

export default apiClient;
