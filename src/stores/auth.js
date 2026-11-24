import { defineStore } from 'pinia';
import apiClient from '@/api/axios';
import { ENDPOINTS } from '@/api/endpoints';
import { resolveAccountKeyFromCredentials } from '@/config/accounts/accounts';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('auth_user')) || null,
        token: localStorage.getItem('auth_token') || null
    }),
    getters: {
        isAuthenticated: (state) => !!state.token
    },
    actions: {
        async login(credentials) {
            if (import.meta.env.VITE_MOCK_AUTH === 'true') {
                const accountKey = resolveAccountKeyFromCredentials(credentials.username);
                const mockResponse = {
                    token: `mock-token-${accountKey}`,
                    account_key: accountKey,
                    user: {
                        id: 1,
                        username: credentials.username,
                        account_key: accountKey
                    }
                };

                this.token = mockResponse.token;
                this.user = mockResponse.user;
                localStorage.setItem('auth_token', mockResponse.token);
                localStorage.setItem('auth_user', JSON.stringify(mockResponse.user));
                return mockResponse;
            }

            const { data } = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
            const accountKey = resolveAccountKeyFromCredentials(
                credentials.username,
                data.account_key || data.user?.account_key
            );

            this.token = data.token;
            this.user = { ...data.user, account_key: accountKey };
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('auth_user', JSON.stringify(this.user));

            return { ...data, account_key: accountKey };
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
        }
    }
});
