import apiClient from '@/api/axios'

export default {
    getAll(params = {}) {
        return apiClient.get('/items', { params })
    },
    create(payload) {
        return apiClient.post('/items', payload)
    }
}
