<template>
    <PrimeCard>
        <template #title>Seleccionar espacio / empresa</template>
        <template #content>
            <div v-if="availableTenants.length" class="tenant-list">
                <PrimeButton
                    v-for="tenant in availableTenants"
                    :key="tenant.id"
                    :label="tenant.name"
                    icon="pi pi-building"
                    outlined
                    @click="chooseTenant(tenant)"
                />
            </div>
            <p v-else>No hay empresas asignadas a este usuario.</p>
        </template>
    </PrimeCard>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useTenantStore } from '@/stores/tenant'

export default {
    name: 'SelectTenantView',
    components: {
        PrimeCard: Card,
        PrimeButton: Button
    },
    computed: {
        ...mapState(useTenantStore, ['availableTenants'])
    },
    methods: {
        ...mapActions(useTenantStore, ['selectTenant']),
        chooseTenant(tenant) {
            this.selectTenant(tenant)
            this.$router.push({ name: 'example-list' })
        }
    }
}
</script>

<style scoped>
.tenant-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}
</style>
