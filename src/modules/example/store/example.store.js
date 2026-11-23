import { defineStore } from 'pinia'
import exampleService from '../api/example.service'

export const useExampleStore = defineStore('example', {
    state: () => ({
        items: [],
        loading: false
    }),
    actions: {
        async fetchItems(params = {}) {
            this.loading = true
            try {
                const { data } = await exampleService.getAll(params)
                this.items = Array.isArray(data) ? data : data.data || []
            } finally {
                this.loading = false
            }
        }
    }
})
