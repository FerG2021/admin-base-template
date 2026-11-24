import apiClient from '@/api/axios'
import { ENDPOINTS } from '@/api/endpoints';

export default {
    getAll(params = {}) {
        return apiClient.get(ENDPOINTS.EXAMPLE.LIST, { params })
    },
    create(payload) {
        return apiClient.post(ENDPOINTS.EXAMPLE.CREATE, payload)
    }
}
