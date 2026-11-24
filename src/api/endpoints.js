export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login'
    },
    CLIENTS: {
        LIST: '/clients',
        DETAIL: (id) => `/clients/${id}`,
        CREATE: '/clients',
        UPDATE: (id) => `/clients/${id}`
    },
    EXAMPLE: {
        LIST: '/items',
        CREATE: '/items'
    }
};
