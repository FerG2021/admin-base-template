<script>
import { mapActions, mapState } from 'pinia'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useExampleStore } from '../store/example.store'

export default {
    name: 'ExampleListView',
    components: {
        PrimeCard: Card,
        DataTable,
        Column
    },
    computed: {
        ...mapState(useExampleStore, ['items', 'loading'])
    },
    mounted() {
        this.fetchItems()
    },
    methods: {
        ...mapActions(useExampleStore, ['fetchItems'])
    }
}
</script>

<template>
    <PrimeCard>
        <template #title>Módulo Ejemplo</template>
        <template #content>
            <DataTable
                :value="items"
                :loading="loading"
                stripedRows
                scrollable
                tableStyle="min-width: 40rem"
            >
                <Column field="id" header="ID" />
                <Column field="name" header="Nombre" />
                <template #empty>No hay registros para mostrar.</template>
            </DataTable>
        </template>
    </PrimeCard>
</template>
